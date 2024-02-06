// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// sample-metadata:
//   title: Create Job
//   description: Create a job that posts to /log_payload on an App Engine service.
//   usage: node createJob.js [project-id] [location-id] [app-engine-service-id]

/**
 * Create a job with an App Engine target via the Cloud Scheduler API
 */
async function createJob(schedulerBody) {
    const scheduler = require('@google-cloud/scheduler');
    // Create a client.
    let config = {
        credentials: {
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCInTlJ/SLoC4Ii\nFnV6f1dMLr1Y+kj/CQ8+vpnFPF+9HErNEctKSebClzZWn4tZ4KTRBaXiFFBmB3XE\nMmYajMJdJjT12pADXQlvuNkAXtWTFZC12ygBU1fbl1EOpz686ou1PXFhsAqgonMS\njB+tfGLUfc3pybIr8Vw4FHgXUTA85/R9nKGw8kfgKRqV46n9x6oHVfcCssCxCaeZ\nP3sPnyyq3ivxJacVjDJhmss0PZjjKcA2Jeb2grRO65MVjP1SBefxHW1eRqMRqUS2\naPw2rWwEfF6H+02xyHOnh6kqeKi8OCBa/2BsfqPLJGn4Z7xQdEZluBpZrUdX0FbJ\n00q/Hf8xAgMBAAECggEAHHBUVHdubI02wBdaSc+X8es57fueNf8iDg757kHo8TJi\nTOnDHrofIEt/m403YlSeIsgQ9e0CJpcveBIAyM6cCG2TcUmYGKclt3zsqYPUZHvF\nBeJzI8GAhN0tWcZNjGCsCCTcBTizIajnmQkT8Ba4cSEmPCCJZ1Xle2QhcsMrLkZS\nLiLw9plkntV4NAxK4iaqh1GlnDflWtEbppfDSZITWbZm4goPm8UdPuUfnSoy4ZCg\nOrHOgwEdVJxAT/KQ1Nu3EFj1s7X3SFosMRfyN0JDao7gqSq8Gt7IfAh0+iknY3+A\no4NxSIYwkEMN18djuGqc+ShtyRXE3xKVg/yaicLbdQKBgQDATzYrF6IanUbZnjB9\nAGBlGKo6xwgIrZoRVV1iRGWOM7EXm+zGe8N3zTbzOPboRbefByV40Mt+DtuFRBLV\n4xsysB/YbJivO1U0NwdrscOJpoJvzEVRRjLpIQmeC/YuX4snjbaEFRK/Pe3YOLtO\n1VWxvdT5mvEOy6/dx4aTWZF7rQKBgQC12+/qmImDLz65ifED/Ynbu94C8yV/oGzr\nF1oTLU9XJ6R8XoyY55F+vnjSgGebU447v4jwPtbKgmc540SrexWy9W9Gd7AjgKjh\nHebCQ80QNSE3elUdF5A0kFES8kxGkas1y7Yomx10kNK4ocqVEYGfPRYBHMqfnVbm\n/JVo5wWCFQKBgQCLDbvBVQll7St516R//nG1KCyO67Oncr/goLUxhPtZ446934VJ\nz9v7GGwPWrVOJnsrhmNWBMPflqasqhhkiB72e9vLBlsw+doWM2QuPw+AzOGsLSxC\nJFxTrgviOAv+ZB+erh23S/WOSx1cJ0lpK2EXcIg7JAoCBM5ZsxhgG3fS0QKBgEp5\nyrQBSfd+ZqqnMhvXPhjNxCrjFo1AzrosMwg9ewuPQY5pThzkYLJOIL7cNRHoUwxm\n8RaqNV5zrwCG8T1kx8slNi/enjS74O1oSHNwPs+PYo4MvESQvM6592nR7qjLyRjb\n1zqj45k0IgfYwlTv+WyUIKnN97EMR2WLNUjjq17NAoGBAKU9WWPng8fjJAGRmeCd\nygfdQ16sUx0+xzHyWxvzh0Sze0ySrOJ85I94Vy1Lc6/L63cfae3PGiWoZaijUtFF\nu7w2B0Bpv0AfPG51UeB0nkQmFLlJq94v6DTuW+7ooUXdQTHknkRSRHoXGeJjnn6R\n2k066b1Gu5dlJ/we0J9XIGtm\n-----END PRIVATE KEY-----\n",
            client_email: "cloudscheduleradmin-391@arrowai-kubernetes.iam.gserviceaccount.com"
        }
    }
    const client = new scheduler.CloudSchedulerClient(config);

    // const client = new scheduler.CloudSchedulerClient();
    const projectId = "arrowai-kubernetes"
    const locationId = "asia-south1"
    const url =schedulerBody.url // where should we say hello?

    // Construct the fully qualified location path.
    const parent = client.locationPath(projectId, locationId);

    // Construct the request body.
    const job = {
        httpTarget: {
            uri: url,
            httpMethod:schedulerBody.httpTypetoUpperCase,
            // body: Buffer.from(schedulerBody.httpBody||{}),
        },
        "name":`projects/${projectId}/locations/${locationId}/jobs/${schedulerBody.applicationId}_${schedulerBody.name}`,
        description:schedulerBody.description,
        schedule:schedulerBody.frequency,
        timeZone: schedulerBody.timeZone,
    };
    const request = {
        parent: parent,
        job: job,
    };
    // Use the client to send the job creation request.
    const [response] = await client.createJob(request);
    console.log(`Created job: ${response.name}`);
    return response;
}
async function getJob(id=undefined) {
    // [START cloud_scheduler_create_job]
    const scheduler = require('@google-cloud/scheduler');

    let config = {
        credentials: {
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCInTlJ/SLoC4Ii\nFnV6f1dMLr1Y+kj/CQ8+vpnFPF+9HErNEctKSebClzZWn4tZ4KTRBaXiFFBmB3XE\nMmYajMJdJjT12pADXQlvuNkAXtWTFZC12ygBU1fbl1EOpz686ou1PXFhsAqgonMS\njB+tfGLUfc3pybIr8Vw4FHgXUTA85/R9nKGw8kfgKRqV46n9x6oHVfcCssCxCaeZ\nP3sPnyyq3ivxJacVjDJhmss0PZjjKcA2Jeb2grRO65MVjP1SBefxHW1eRqMRqUS2\naPw2rWwEfF6H+02xyHOnh6kqeKi8OCBa/2BsfqPLJGn4Z7xQdEZluBpZrUdX0FbJ\n00q/Hf8xAgMBAAECggEAHHBUVHdubI02wBdaSc+X8es57fueNf8iDg757kHo8TJi\nTOnDHrofIEt/m403YlSeIsgQ9e0CJpcveBIAyM6cCG2TcUmYGKclt3zsqYPUZHvF\nBeJzI8GAhN0tWcZNjGCsCCTcBTizIajnmQkT8Ba4cSEmPCCJZ1Xle2QhcsMrLkZS\nLiLw9plkntV4NAxK4iaqh1GlnDflWtEbppfDSZITWbZm4goPm8UdPuUfnSoy4ZCg\nOrHOgwEdVJxAT/KQ1Nu3EFj1s7X3SFosMRfyN0JDao7gqSq8Gt7IfAh0+iknY3+A\no4NxSIYwkEMN18djuGqc+ShtyRXE3xKVg/yaicLbdQKBgQDATzYrF6IanUbZnjB9\nAGBlGKo6xwgIrZoRVV1iRGWOM7EXm+zGe8N3zTbzOPboRbefByV40Mt+DtuFRBLV\n4xsysB/YbJivO1U0NwdrscOJpoJvzEVRRjLpIQmeC/YuX4snjbaEFRK/Pe3YOLtO\n1VWxvdT5mvEOy6/dx4aTWZF7rQKBgQC12+/qmImDLz65ifED/Ynbu94C8yV/oGzr\nF1oTLU9XJ6R8XoyY55F+vnjSgGebU447v4jwPtbKgmc540SrexWy9W9Gd7AjgKjh\nHebCQ80QNSE3elUdF5A0kFES8kxGkas1y7Yomx10kNK4ocqVEYGfPRYBHMqfnVbm\n/JVo5wWCFQKBgQCLDbvBVQll7St516R//nG1KCyO67Oncr/goLUxhPtZ446934VJ\nz9v7GGwPWrVOJnsrhmNWBMPflqasqhhkiB72e9vLBlsw+doWM2QuPw+AzOGsLSxC\nJFxTrgviOAv+ZB+erh23S/WOSx1cJ0lpK2EXcIg7JAoCBM5ZsxhgG3fS0QKBgEp5\nyrQBSfd+ZqqnMhvXPhjNxCrjFo1AzrosMwg9ewuPQY5pThzkYLJOIL7cNRHoUwxm\n8RaqNV5zrwCG8T1kx8slNi/enjS74O1oSHNwPs+PYo4MvESQvM6592nR7qjLyRjb\n1zqj45k0IgfYwlTv+WyUIKnN97EMR2WLNUjjq17NAoGBAKU9WWPng8fjJAGRmeCd\nygfdQ16sUx0+xzHyWxvzh0Sze0ySrOJ85I94Vy1Lc6/L63cfae3PGiWoZaijUtFF\nu7w2B0Bpv0AfPG51UeB0nkQmFLlJq94v6DTuW+7ooUXdQTHknkRSRHoXGeJjnn6R\n2k066b1Gu5dlJ/we0J9XIGtm\n-----END PRIVATE KEY-----\n",
            client_email: "cloudscheduleradmin-391@arrowai-kubernetes.iam.gserviceaccount.com"
        }
    }
    const client = new scheduler.CloudSchedulerClient(config);

    // TODO(developer): Uncomment and set the following variables
    const projectId = "arrowai-kubernetes"
    const locationId = "asia-south1"
    // const serviceId = "my-serivce"

    // Construct the fully qualified location path.
    const parent = client.locationPath(projectId, locationId);
    // Construct the request body.
    const request = {
        parent: parent
    };
    // Use the client to send the job creation request.
    return response;
    console.log(`Job List job: ${response}`);
    // [END cloud_scheduler_create_job]
}


module.exports = {
    getJob,
    createJob
}


//api ,http request ,send message, start campaign