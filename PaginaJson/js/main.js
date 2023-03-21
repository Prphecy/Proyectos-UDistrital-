if (window.location.href.indexOf("doctor.html") != -1) {
  const formDoctor = document.querySelector("#formDoctor");
  const procesarDatosDoctor = (event) => {
    event.preventDefault();
    const datos = new FormData(event.target);
    const datosCompletosDoctor = Object.fromEntries(datos.entries());
    const jsonDatosDoctor = JSON.stringify(datosCompletosDoctor);
    const data = JSON.parse(jsonDatosDoctor);
    const table = document.getElementById("tabla");
    const headers = Object.keys(data);
    const values = Object.values(data);

    // Agregar encabezados de columna
    const headerRow = document.createElement("tr");
    headers.forEach((headerText) => {
      const header = document.createElement("th");
      const textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Agregar fila de datos
    const row = document.createElement("tr");
    values.forEach((value) => {
      const cell = document.createElement("td");
      const textNode = document.createTextNode(value);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
    table.appendChild(row);
  };
  formDoctor.addEventListener("submit", procesarDatosDoctor);
  
} else if (window.location.href.indexOf("paciente.html") != -1) {
  const formPaciente = document.querySelector("#formPaciente");
  const procesarDatosPaciente = (event) => {
    event.preventDefault();
    const datos = new FormData(event.target);
    const datosCompletosPaciente = Object.fromEntries(datos.entries());
    const jsonDatosPaciente = JSON.stringify(datosCompletosPaciente);
    const data = JSON.parse(jsonDatosPaciente);
    const table = document.getElementById("tabla");
    const headers = Object.keys(data);
    const values = Object.values(data);

    // Agregar encabezados de columna
    const headerRow = document.createElement("tr");
    headers.forEach((headerText) => {
      const header = document.createElement("th");
      const textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Agregar fila de datos
    const row = document.createElement("tr");
    values.forEach((value) => {
      const cell = document.createElement("td");
      const textNode = document.createTextNode(value);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
    table.appendChild(row);
  };
  formPaciente.addEventListener("submit", procesarDatosPaciente);
}
