
# list of apis: 
## Event Lsit Api:
### apiUrl:https://event.arrowai.in/eventSchema :GET 

### Request Parameters
~~~json
applicationId:<applicationId>
~~~

#### Response
~~~json
{
    "applicationId": "fdhsfgdsfgdjshfgdsjf",
    "events": [{
        "name": "Add To Cart",
        "properties": [{
            "name": "category",
            "type": "enumDynamic"
        }]
    }]
}
~~~
