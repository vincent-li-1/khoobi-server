const container = document.querySelector('.e-con-inner');

const table = document.createElement('table');

const headers = ['Service', 'Price', 'Location', 'Salon', 'Booking Link', 'Rating'];

const headerRow = document.createElement('tr');

headers.forEach((header) => {
    let tableHeader = document.createElement('th');
    tableHeader.innerText = header;
    tableHeader.style.color = "#CE94D8";
    headerRow.appendChild(tableHeader);
})

table.appendChild(headerRow);

async function getServices() {
    const services = await fetch('http://localhost:80/getServices').then((res) => res.json());

services.forEach((service) => {
    let tableRow = document.createElement('tr');
    let bookingURL;
    for (const [key, value] of Object.entries(service)) {
        if (key !== 'id') {
            if (key === 'booking_url') {
                bookingURL = value;
            }
            else {
                let tableEntry = document.createElement('td');
                let text;
                if (key === 'booking_name') {
                    let link = document.createElement('a');
                    link.href = bookingURL;
                    link.innerText = value;
                    tableEntry.appendChild(link);
                }
                else {
                    tableEntry.innerText = key === 'cost' ? `$${value}` : value;
                }
                tableEntry.style.color = '#CE94D8';
                tableRow.appendChild(tableEntry);
            }
        }
        }
        table.appendChild(tableRow);
})
}

getServices();

container.appendChild(table);