## API Testing with Postman

All backend API endpoints were tested using Postman.  
The following screenshots demonstrate correct API behavior and error handling.

---

### Weather API — 200 OK
**Endpoint:** `GET /api/weather?city=Almaty`

![Weather Success](screenshots/Weathersuccess.png)

---

### Weather API — 400 Bad Request
**Endpoint:** `GET /api/weather`

![400 Error](screenshots/400error.png)

---

### News API — 200 OK
**Endpoint:** `GET /api/news?city=Almaty`

![News Success](screenshots/Newssuccess.png)

---

### Currency API — 200 OK
**Endpoint:** `GET /api/currency?country=KZ`

![Currency Success](screenshots/Currencysuccess.png)
