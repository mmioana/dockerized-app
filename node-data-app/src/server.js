'use strict';

const Hapi=require('hapi');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const uri = "mongodb://mymongo/dummy-app";

// Create a server with a host and port
const server=Hapi.server({
    port:3000
});

const onGetConectionActive = async (request, h) => {
	const responseData =	await
		new Promise((resolve, reject) => {
			client.connect(uri, (err, db) => {
				db.close();
				const isConnected = true;
				if (err) {
					isConnected = false;
				}
				resolve({ connected: isConnected });
			});
		})
		.then((result) => {
			return result;
		});
		
	return h.response(responseData);
};

const onPostData = async (request, h) => {
	console.log("-------------");
	const responseData = await
		new Promise((resolve, reject) => {
			client.connect(uri, (err, db) => {
				if (err) {
					reject(err);
				}
								
				const payload = JSON.parse(request.payload);			
				const collection = db.collection('dummy');
				
				console.log(payload);
				
				if(payload === "") {
					resolve({ result: 'failure' })
				}
				
				collection.insert(payload, (err, res) => {
					db.close();
					if (err) {
						reject(err);
					}
					resolve({ result: 'success' })
				});
			});	
		})
		.then((result) => {
			return result;
		});
	
	return h.response(responseData);
};

// Add the route
server.route({
    method:'GET',
    path:'/conn',
    handler: onGetConectionActive,
	config: {
		cors: true
	  }
});

server.route({
    method:'POST',
    path:'/save',
    handler: onPostData,
	config: {
		cors: true
	  }
});

server.route({
    method:'GET',
    path: '/duration',
    handler: async function(request, h) {
        const responseData = await  
			new Promise((resolve, reject) => {
				client.connect(uri, (err, db) => {
					const collection = db.collection('dummy');
					
					const startDate = new Date();
					
					let aggregatedRes = [];
					
					collection.aggregate([
								{ $match : { values: { $exists: true} }},
								{ $project: {	
									_id: 0, 
									username: { $toUpper: "$name"}, 
									values: true 
									}
								}
							]).toArray((err, res) => {
								const endDate = new Date();
								const timeDiff = endDate.getTime() - startDate.getTime();
								if (res !== undefined && res.length > 0) {
									aggregatedRes = res;
								}
								resolve({
										people: aggregatedRes,
										duration: timeDiff
									});
							});
					
					db.close();
					
				});
			})
			.then((response) => {
				return response;
			});
			
		return h.response(responseData);
    },
	config: {
		cors: true
	  }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
	
    console.log('Server running at:', server.info.uri);
};

start();