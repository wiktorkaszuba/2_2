(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  const formDiv = document.getElementById("form")
  let formHtml = `
    <label for="wybor">Wybierz post:</label>
    <select id="wybor">`;
  for (let i = 1; i <= 10; i++) {
    formHtml += `<option value='${i}'>${i}</option>`;
  }
  formHtml += `</select>`;
  formDiv.innerHTML = formHtml;

  example.addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function() {
    answer.innerHTML = "Loading...";
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        let html = "<ul>";

        array.forEach((el) => {
          html += `
            <li>
              ${el.title}
              <ul>
                <li>${el.body}</li>
              </ul>
            </li>
          `;
        });

        html += "</ul>";

        answer.innerHTML = html;
      });
  });

  cw2.addEventListener("click", function() {
    let sel = document.querySelector("#wybor").value;
    answer.innerHTML = "Loading...";
    console.log(sel);
    fetch('https://jsonplaceholder.typicode.com/posts/' + sel)
      .then(response => response.json())
      .then(json => {
        let html = "<ul>";

        html += `
          <li>
            ${json.title}
            <ul>
              <li>${json.body}</li>
            </ul>
          </li>
        `;

        html += "</ul>";

        answer.innerHTML = html;
      });
  })

  cw3.addEventListener("click", function() {
    answer.innerHTML = "Processing...";
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'test',
        body: 'testtest123',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        answer.innerHTML = `Dodano nowy post o ID = ${json.id}`;
      })
  })

})();
