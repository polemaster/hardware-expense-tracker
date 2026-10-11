## Hardware expense tracker
Web application that tracks hardware expenses, e.g. computers, and converts their USD price to PLN using NBP (Narodowy Bank Polski) API. The application is separated into frontend and backend and follows REST API methodology. Frontend is written in React and backend in Java Spring Boot. 

The app has three pages that allow the user to:
1. **Home:** create a new invoice
2. **Invoices:** get a list of all invoices and their items
3. **Items:** search and sort invoice items by name and posting date

Notable things I added that were not specified in the instruction but were logical to implement:
- Invoice added to the database (computer became InvoiceItem). Invoice contains multiple InvoiceItems.
- If the exchange rate is not found for the given day, the program loops through the past month for the latest available exchange rate.

There is a JSON file included in the repository which contains a collection of requests exported from Postman software.

### Technologies used
**Frontend:**
- React (with TypeScript)
- TailwindCSS
- Tanstack Query
- React Router

**Backend:**
- Java 21
- Spring Boot
- H2 database
- REST API
- Lombok
- JAXB (for XML)

### Running
**Frontend:**

From *frontend* directory run:
```bash
npm run dev
```

**Backend:**

Run *backend/BackendApplication.java* using your IDE of choice (e.g. IntelliJ IDEA).


### Screenshots
<img width="1864" height="1122" alt="image" src="https://github.com/user-attachments/assets/06deb3e3-7c5c-437d-b9a9-9860ae80d09d" />

<img width="1840" height="1168" alt="image" src="https://github.com/user-attachments/assets/dcf220b2-1c45-4be2-83b3-55e52dfe9499" />

<img width="1856" height="1104" alt="image" src="https://github.com/user-attachments/assets/ca57c1e1-1449-4f04-b3c0-e73642d95460" />


### Possible improvements
Things that could be improved but were not a part of the task:
- adding a Product entity with one to many relationship with InvoiceItem
- moving postingDate to Invoice rather than InvoiceItem
- supporting modification and deletion of currently stored data, both in the UI and on the server (second half of CRUD)
- adding more unit tests
- making the app ready for production
