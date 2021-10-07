# Food API
## How to use
>### Items
>`GET` **localhost:1235/api/v1/data**<br><br>

> ### Search
> `GET` **localhost:1235/api/v1/data/search?...** <br><br>
>> | Parameters | Description | Type  |
>> | -------------- |:-----------------------------------:| -----:|
>> | limit= | Number of items | `Number` |
>> | type= | Category | `String` |
>> | filter= | Filter by price <br> 1. `asc`: Filter in ascending order <br> 2. `dec`: Filter in descending order <br> 3. `idAsc`: Filter in order by ID in ascending order <br> 4. `idDec`: Filter in order by ID in decending | `String` |
