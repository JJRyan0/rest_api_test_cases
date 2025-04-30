

//Test Script Scenarios for RESful API using postman 

// Test 1 Script: Validate Response Contains expected data
//This ensures that the API returns all the required data fields so the front-end or other systems depending on this API 
// work correctly.

pm.test("Response contains required fields" , function () { //This is a test case. It checks if the API response has the expected fields.
    let jsonData = pm.response.json(); //Converts the response body from JSON format so we can easily access its properties.

    pm.expect(jsonData).to.have.property("total"); // Checks if "total" exists in the response.
    pm.expect(jsonData).to.have.property("totalHits"); //Checks if "totalHits" exists in the response.
    pm.expect(jsonData.hits).to.be.an("array").that.is.not.empty; //Ensures that "hits" is an array and is not empty.

    pm.expect(jsonData.hits[0]).to.have.property("id"); // Checks if the first item in "hits" contains an "id".
    pm.expect(jsonData.hits[0]).to.have.property('pageURL');
    pm.expect(jsonData.hits[0]).to.have.property('tags');
    })


//Test 2: Validate API Performance (Response Time < 1000ms)
pm.test("Response time is acceptable", function() {
    pm.expect(pm.response.responseTime).to.be.below(1000);
})


// What This Does:
// pm.test("Response time is acceptable", function () {...}) → A test to measure response time.
//pm.expect(pm.response.responseTime).to.be.below(1000); → Ensures that the API request completes in under 1000ms (1 second).

//Test 3: Validate JSON Response Structure
let jsonData = pm.response.json();

pm.test("totalHits should be a number", function () {
    pm.expect(jsonData.totalHits).to.be.a('number');
});

pm.test("Each hit has required fields", function () {
    jsonData.hits.forEach((item) => {
        pm.expect(item).to.have.property("id");
        pm.expect(item).to.have.property("pageURL");
        pm.expect(item).to.have.property("type");
        pm.expect(item).to.have.property("tags");
    });
});

// Test 4: Validate Consistency of totalHits and hits Length
//Ensures that the response does not return more results than expected.

let jsonData = pm.response.json();

pm.test("totalHits matches hits length constraint", function () {
    pm.expect(jsonData.hits.length).to.be.at.most(jsonData.totalHits); //The number of items in the "hits" array should not exceed totalHits.
});


// Test 5: Validate Data Types of Key Fields
pm.test("Check data types of key fields", function () {
    let jsonData = pm.response.json();

    jsonData.hits.forEach((item) => {
        pm.expect(item.id).to.be.a('number'); //Ensure id is a number.
        pm.expect(item.pageURL).to.be.a('string'); //Ensure pageURL is a string.
        pm.expect(item.likes).to.be.a('number'); //Ensure likes and comments are numbers.
        pm.expect(item.comments).to.be.a('number'); //Ensure likes and comments are numbers.
    });
});

//Test 6: Ensure No Duplicate Entries in hits
//Checks if multiple objects in hits have the same id.
//Duplicate ids can indicate data integrity issues in the API.

//Postman Post-Request Script

pm.test("Ensure no duplicate IDs in hits", function () {
    let jsonData = pm.response.json();
    let ids = jsonData.hits.map(item => item.id);
    
    let uniqueIds = new Set(ids);
    
    pm.expect(uniqueIds.size).to.eql(ids.length, "Duplicate IDs found in hits array");
});

// Test 7: Validate Image URLs are Reachable
//Ensures that image URLs provided in the response (e.g., previewURL, largeImageURL) actually exist.
//Makes a separate HTTP request to each image URL to confirm it is reachable (returns a 200 status).

let jsonData = pm.response.json();

pm.test("Check if image URLs are reachable", async function () {
    let allUrlsReachable = true;

    for (let item of jsonData.hits) {
        let imageUrl = item.previewURL;
        
        try {
            let imageResponse = await pm.sendRequest({ url: imageUrl, method: "GET" });
            if (imageResponse.code !== 200) {
                allUrlsReachable = false;
            }
        } catch (error) {
            allUrlsReachable = false;
        }
    }
    
    pm.expect(allUrlsReachable).to.be.true;
});
