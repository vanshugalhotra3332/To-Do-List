let add = document.getElementById('add');

function update() {
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (tit.length && desc.length != 0) {
        if (localStorage.getItem('itemsJson') == null) {

            itemJsonArray = [];
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            document.getElementById('title').value = ""
            document.getElementById('description').value = ""
        }
        else {
            itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            document.getElementById('title').value = ""
            document.getElementById('description').value = ""
        }
        // add items into table
        tablebody = document.getElementById('tableBody');
        prevHTML = '<h2></h2>'
        let str = "";
        if (itemJsonArray != null) {
            itemJsonArray.forEach((element, index) => {
                str += `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button type='button' class="btn btn-primary" onclick="deleted(${index + 1})"">Delete</button></td>
        </tr>
            `
            });
            tablebody.innerHTML = str;
        }
        else{
            tablebody.innerHTML = prevHTML;
        }
    }
    else {
        itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
        // add items into table
        tablebody = document.getElementById('tableBody');
        prevHTML = '<h2></h2>'
        let str = "";
        if (itemJsonArray != null) {
            itemJsonArray.forEach((element, index) => {
                str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button type='button' class="btn btn-primary" onclick="deleted(${index + 1})"">Delete</button></td>
                </tr>
                    `
            });
            tablebody.innerHTML = str;
        }
        else {
            tablebody.innerHTML = prevHTML;
        }
    }

};

add.addEventListener("click", update);
update();

function deleted(itemIndex) {
    console.log('delete', itemIndex);
    itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'));

    itemJsonArray.splice(itemIndex - 1, 1);

    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}

clear_list = () => {
    localStorage.clear();
    update();
}

clear_btn = document.getElementById('clear_button');
clear_btn.addEventListener('click', clear_list);