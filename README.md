


Things to note:

-'Graph' and 'Data processed in browser' both get their data pools from a axios api call that is cached in the browsers local storage.
I done this out of curiosity to see the loading times compared to local data aggregation. 

-Data processed in 'Browser' and 'Server Side' show different values, This is interesting little 'bug' due to the date parsing on the server side.
Server side returns data INCLUDING the requested date. Browser data filters UPTO the requested date, there is a 24h difference. I left it in as a little reminder of how difficult it is to work with time.

-Cases dataset comes for a gist i complied from data obtained from the thl api. I tried to implement a endpoint so i could get the dat based on the date, but I couldn't decipher the api documentations for date queries

