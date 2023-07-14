document.addEventListener("DOMContentLoaded", () => {
    const formDoctor = document.querySelector("#formDoctor");
    const formPaciente = document.querySelector("#formPaciente");
    const tabla = document.querySelector("#tabla");
  
    const submitHandler = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      sendDataToBackend(data);
      event.target.reset();
    };
  
    formDoctor.addEventListener("submit", submitHandler);
    formPaciente.addEventListener("submit", submitHandler);
  
    const sendDataToBackend = (data) => {
      const url = window.location.href.includes("doctor.html")
        ? "/doctores"
        : "/pacientes";
  
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          fetchDataFromBackend();
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const fetchDataFromBackend = () => {
      const url = window.location.href.includes("doctor.html")
        ? "/doctores"
        : "/pacientes";
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          displayDataInTable(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const displayDataInTable = (data) => {
      tabla.innerHTML = ""; // Limpiar la tabla antes de mostrar nuevos datos
  
      if (data.length === 0) {
        tabla.innerHTML = "<tr><td colspan='8'>No hay datos disponibles</td></tr>";
        return;
      }
  
      const headers = Object.keys(data[0]);
      const headerRow = document.createElement("tr");
  
      headers.forEach((headerText) => {
        const header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
      });
  
      tabla.appendChild(headerRow);
  
      data.forEach((item) => {
        const row = document.createElement("tr");
  
        headers.forEach((headerText) => {
          const cell = document.createElement("td");
          cell.textContent = item[headerText];
          row.appendChild(cell);
        });
  
        tabla.appendChild(row);
      });
    };
  
    fetchDataFromBackend();
  });
  