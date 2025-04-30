# Test Script Scenarios for RESful API using postman and Java Script 

__Test 1 Script: Validate Response Contains expected data__

* This ensures that the API returns all the required data fields so the front-end or other systems depending on this API 
work correctly.

__Test 2: Validate API Performance (Response Time < 1000ms)__

* A test to measure response time.
* Ensures that the API request completes in under 1000ms (1 second).

__Test 3: Validate JSON Response Structure__

__Test 4: Validate Consistency of totalHits and hits Length__

* Ensures that the response does not return more results than expected.
* The number of items in the "hits" array should not exceed totalHits.

__Test 5: Validate Data Types of Key Fields__

__Test 6: Ensure No Duplicate Entries in hits__

* Checks if multiple objects in hits have the same id.
* Duplicate ids can indicate data integrity issues in the API.

__Test 7: Validate Image URLs are Reachable__

* Ensures that image URLs provided in the response (e.g., previewURL, largeImageURL) actually exist.
* Makes a separate HTTP request to each image URL to confirm it is reachable (returns a 200 status).
