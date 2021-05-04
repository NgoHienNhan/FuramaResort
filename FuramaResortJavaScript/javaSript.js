let check = true;
let listCustomer = [];
let listEmployees = [];
let checkBirth = new RegExp(/^[0-9]{2}\/(([0][1-9])|([1][0-2]))\/(([1][9][3-9)][0-9])|([2][0][0-2][0-1]))$/);
let checkID = new RegExp(/^[0-9]{9}$/);
let checkEmail = new RegExp(/^([a-z-A-Z-0-9])+[@][a-z]{5}[.][a-z]{3}$/);
let countNv = 0;
let countCus = 0;

class Employee {
    constructor(name, id, birth, email, office) {
        this.name = name;
        this.idCard = id;
        this.dayOfBirth = birth;
        this.email = email;
        this.office = office;
    }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name;
    }

    setIdCard(id) {
        this.idCard = id;
    }

    getIdCard() {
        return this.idCard;
    }

    setDayOfBirth(birth) {
        this.dayOfBirth = birth;
    }

    getDayOfBirth() {
        return this.dayOfBirth;
    }

    setEmail(email) {
        this.email = email
    }

    getEmail() {
        return this.email;
    }

    setOffice(office) {
        this.office = office;
    }

    getOffice(office) {
        return this.office;
    }

    setSalary() {
        let salary = 0;
        if (this.office === 'Manager') {
            salary = 500;
        } else {
            if (this.office === 'Sale') {
                salary = 300;
            } else {
                salary = 200;
            }
        }
        return salary;
    }
}

function home() {
    document.getElementById('titleHome').innerText = "Welcome to Furama resort";
    document.getElementById('show').innerText = '';
}

function addEmployee() {
    let formEmployee = "<h1>Nhập thông tin của nhân viên :</h1>\n" +
        "<form>\n" +
        "    <h3>Họ và tên\\Full name:</h3>\n" +
        "    <input type=\"text\" id=\"name\">\n" +
        "    <h3>CMND\\ID card:</h3>\n" +
        "    <input type=\"text\" id=\"id\">\n" +
        "    <h3>Ngày sinh\\Date of birth:</h3>\n" +
        "    <input type=\"text\" id=\"date\">\n" +
        "    <h3>Email:</h3>\n" +
        "    <input type=\"text\" id=\"email\">\n" +
        "    <h3>Chức vụ\\Office:</h3>\n" +
        "    <select id=\"office\">\n" +
        "        <option value=\"Manager\">Manager</option>\n" +
        "        <option value=\"Sale\">Sale</option>\n" +
        "        <option value=\"Marketing\">Marketing</option>\n" +
        "    </select>\n" +
        "    <br>\n" +
        "    <br>\n" +
        "    <input type=\"reset\" value=\"Reset\">\n" +
        "</form>\n" +
        "<br>\n" +
        "<br>\n" +
        "<div class=\"button\">\n" +
        "        <a class=\"btn\" onclick=\"submit()\">Submit</a>\n" +
        "    </div>";
    document.getElementById('show').innerHTML = formEmployee;
    document.getElementById('titleHome').innerText = '';

}

function submit() {
    let nameEdit = "";
    let name = document.getElementById('name').value;
    name = name.trim().toLowerCase();
    for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) === " " && name.charAt(i + 1) === " ") {
            continue;
        }
        if (i === 0 || name.charAt(i - 1) === " ") {
            nameEdit += name.charAt(i).toUpperCase();
            continue
        }
        nameEdit += name.charAt(i);
    }
    name = nameEdit;
    if (name === '') {
        document.getElementById('name').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('name').style.borderColor = "blue";
    }
    let id = document.getElementById('id').value;
    let testID = checkID.test(id);
    if (!testID) {
        check = false;
        document.getElementById('id').style.borderColor = "red";
    } else {
        document.getElementById('id').style.borderColor = "blue";
    }

    let birth = document.getElementById('date').value;
    let testBirth = checkBirth.test(birth);
    if (!testBirth) {
        document.getElementById('date').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('date').style.borderColor = "blue";
    }
    let email = document.getElementById('email').value;
    let testEmail = checkEmail.test(email);
    if (!testEmail) {
        document.getElementById('email').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('email').style.borderColor = "blue";
    }
    let office;
    office = document.getElementById('office').value;
    if (check === true) {
        let objEmployee = new Employee(name, id, birth, email, office);
        listEmployees.push(objEmployee);
        alert('Thêm mới thành công.');
        document.getElementById('name').value = '';
        document.getElementById('id').value = '';
        document.getElementById('date').value = '';
        document.getElementById('email').value = '';
        console.log(listEmployees);
    }
    check = true;
}

function tableListEmployee() {
    let tableString = '<h2>Danh sách nhân viên:</h2>\n' + '<table>\n' +
        '    <tr>\n' +
        '        <th>STT</th>\n' +
        '        <th>Full name</th>\n' +
        '        <th>Date of birth</th>\n' +
        '    </tr>';
    for (let i = 0; i < listEmployees.length; i++) {
        countNv++;
        tableString = tableString + '<tr>\n' +
            '        <td>' + (i + 1) + '</td>\n' +
            '        <td>' + listEmployees[i].getName() + '</td>\n' +
            '        <td>' + listEmployees[i].getDayOfBirth() + '</td>\n' +
            '<td style="align-content: center"><div class="buttonListEmployee">\n' +
            '        <ul>\n' +
            '            <li><a href="#" onclick="displayEmployee(' + i + ')">Display Information Employee</a></li>\n' +
            '            <li><a href="#" onclick="salary(' + i + ')">Salary of Employees</a></li>\n' +
            '        </ul>\n' +
            '    </div></td>\n' +
            '    </tr>'
    }
    tableString = tableString + '</table>';
    document.getElementById('show').innerHTML = tableString;
    document.getElementById('titleHome').innerText = '';
}

function displayEmployee(i) {
    let thongTinNV = "<h1>Thông tin nhân viên:</h1>\n" +
        "<h3>Họ và tên\\Full name:</h3>\n" +
        "<p>" + listEmployees[i].getName() + "</p>\n" +
        "<h3>CMND\\ID card:</h3>\n" +
        "<p>" + listEmployees[i].getDayOfBirth() + "</p>\n" +
        "<h3>Ngày sinh\\Date of birth:</h3>\n" +
        "<p>" + listEmployees[i].getIdCard() + "</p>\n" +
        "<h3>Email:</h3>\n" +
        "<p>" + listEmployees[i].getEmail() + "</p>\n" +
        "<h3>Chức vụ\\Office:</h3>\n" +
        "<p>" + listEmployees[i].getOffice() + "</p>";
    document.getElementById('show').innerHTML = thongTinNV;
}

function salary(i) {
    let salaryNV = "<h1>Thông tin nhân viên:</h1>\n" +
        "<h3>Họ và tên\\Full name:</h3>\n" +
        "<p>" + listEmployees[i].getName() + "</p>\n" +
        "<h3>CMND\\ID card:</h3>\n" +
        "<p>" + listEmployees[i].getDayOfBirth() + "</p>\n" +
        "<h3>Ngày sinh\\Date of birth:</h3>\n" +
        "<p>" + listEmployees[i].getIdCard() + "</p>\n" +
        "<h3>Email:</h3>\n" +
        "<p>" + listEmployees[i].getEmail() + "</p>\n" +
        "<h3>Chức vụ\\Office:</h3>\n" +
        "<p>" + listEmployees[i].getOffice() + "</p>" +
        "<h3>Lương\\Salary:</h3>\n" +
        "<p>" + listEmployees[i].setSalary() + "</p>";
    document.getElementById('show').innerHTML = salaryNV;
}

class Customer {
    constructor(name, id, birth, email, renDay, accom, typeCus, typeSer, typeRoom) {
        this.name = name;
        this.idCard = id;
        this.dayOfBirth = birth;
        this.email = email;
        this.renDays = renDay;
        this.accompanying = accom;
        this.typeOfCustomer = typeCus;
        this.typeOfService = typeSer;
        this.typeOfRoom = typeRoom;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setIdCard(id) {
        this.idCard = id;
    }

    getIdCard() {
        return this.idCard;
    }

    setDayOfBirth(birth) {
        this.dayOfBirth = birth;
    }

    getDayOfBirth() {
        return this.dayOfBirth;
    }

    setEmail(email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setRenDays(renDay) {
        this.renDays = renDay;
    }

    getRenDays() {
        return this.renDays;
    }

    setAccompanying(accom) {
        this.accompanying = accom;
    }

    getAccompanying() {
        return this.accompanying;
    }

    setTypeOfCustomer(typeCus) {
        this.typeOfCustomer = typeCus;
    }

    getTypeOfCustomer() {
        return this.typeOfCustomer;
    }

    setTypeOfService(typeSer) {
        this.typeOfService = typeSer;
    }

    getTypeOfService() {
        return this.typeOfService;
    }

    setTypeOfRoom(typeRoom) {
        this.typeOfRoom = typeRoom;
    }

    getTypeOfRoom() {
        return this.typeOfRoom;
    }

    totalPay() {
        let total = 0;
        if (this.typeOfRoom === 'Villa') {
            total = 500 * this.renDays;
        } else {
            if (this.typeOfRoom === 'House') {
                total = 300 * this.renDays;
            } else {
                total = 100 * this.renDays;
            }
        }
        return total;
    }
}

function addCustomer() {
    let formCus = "<h1>Nhập thông tin của khách hàng :</h1>\n" +
        "<form>\n" +
        "    <h3>Họ và tên\\Full name:</h3>\n" +
        "    <input type=\"text\" id=\"nameCus\">\n" +
        "    <h3>CMND\\ID card:</h3>\n" +
        "    <input type=\"text\" id=\"idCus\">\n" +
        "    <h3>Ngày sinh\\Date of birth:</h3>\n" +
        "    <input type=\"text\" id=\"dateCus\">\n" +
        "    <h3>Email:</h3>\n" +
        "    <input type=\"text\" id=\"emailCus\">\n" +
        "    <h3>Ngày thuê\\Ren days:</h3>\n" +
        "    <input type=\"number\" id=\"renDays\">\n" +
        "    <h3>Số người đi kèm\\Accompanying:</h3>\n" +
        "    <input type=\"number\" id=\"accom\">\n" +
        "    <h3>Loại thành viên\\Type of customer:</h3>\n" +
        "    <select id=\"typeCuss\">\n" +
        "        <option value=\"Diamond\">Diamond</option>\n" +
        "        <option value=\"Platinum\">Platinum</option>\n" +
        "        <option value=\"Gold\">Gold</option>\n" +
        "        <option value=\"Silver\">Silver</option>\n" +
        "        <option value=\"Member\">Member</option>\n" +
        "    </select>\n" +
        "    <h3>Loại dịch vụ\\Type of service:</h3>\n" +
        "    <select id=\"typeSer\">\n" +
        "        <option value=\"Villa\">Villa</option>\n" +
        "        <option value=\"House\">House</option>\n" +
        "        <option value=\"Room\">Room</option>\n" +
        "    </select>\n" +
        "    <h3>Loại phòng\\Type of room:</h3>\n" +
        "    <select id=\"typeRoom\">\n" +
        "        <option value=\"Vip\">Vip</option>\n" +
        "        <option value=\"Business\">Business</option>\n" +
        "        <option value=\"Normal\">Normal</option>\n" +
        "    </select>\n" +
        "    <br>\n" +
        "    <br>\n" +
        "    <input type=\"reset\" value=\"Reset\">\n" +
        "</form>\n" +
        "<br>\n" +
        "<br>\n" +
        "<div class=\"button\">\n" +
        "        <a class=\"btn\" onclick=\"submitCus()\">Submit</a>\n" +
        "    </div>";
    document.getElementById('show').innerHTML = formCus;
    document.getElementById('titleHome').innerText = '';
}

function submitCus() {
    let nameEdit = "";
    let name = document.getElementById('nameCus').value;
    name = name.trim().toLowerCase();
    for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) === " " && name.charAt(i + 1) === " ") {
            continue;
        }
        if (i === 0 || name.charAt(i - 1) === " ") {
            nameEdit += name.charAt(i).toUpperCase();
            continue
        }
        nameEdit += name.charAt(i);
    }
    name = nameEdit;
    if (name === '') {
        document.getElementById('nameCus').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('nameCus').style.borderColor = "blue";
    }
    let id = document.getElementById('idCus').value;
    let testID = checkID.test(id);
    if (!testID) {
        check = false;
        document.getElementById('idCus').style.borderColor = "red";
    } else {
        document.getElementById('idCus').style.borderColor = "blue";
    }

    let birth = document.getElementById('dateCus').value;
    let testBirth = checkBirth.test(birth);
    if (!testBirth) {
        document.getElementById('dateCus').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('dateCus').style.borderColor = "blue";
    }
    let email = document.getElementById('emailCus').value;
    let testEmail = checkEmail.test(email);
    if (!testEmail) {
        document.getElementById('emailCus').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('emailCus').style.borderColor = "blue";
    }
    let renDays = document.getElementById('renDays').value;
    if (renDays === '') {
        document.getElementById('renDays').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('renDays').style.borderColor = "blue";
    }
    let accom = document.getElementById('accom').value;
    if (accom === '') {
        document.getElementById('accom').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('accom').style.borderColor = "blue";
    }
    let typeCus = document.getElementById('typeCuss').value;
    let typeSer = document.getElementById('typeSer').value;
    let typeRoom = document.getElementById('typeRoom').value;
    if (check === true) {
        let objNewCustomer = new Customer(name, id, birth, email, renDays, accom, typeCus, typeSer, typeRoom);
        listCustomer.push(objNewCustomer);
        document.getElementById('nameCus').value = '';
        document.getElementById('idCus').value = '';
        document.getElementById('dateCus').value = '';
        document.getElementById('emailCus').value = '';
        document.getElementById('renDays').value = '';
        document.getElementById('accom').value = '';
    }
    check = true;
}

function tableListCustomer() {
    let tableString = '<h2>Danh sách khách hàng:</h2>\n' + '<table>\n' +
        '    <tr>\n' +
        '        <th>STT</th>\n' +
        '        <th>Full name</th>\n' +
        '        <th>Date of birth</th>\n' +
        '    </tr>';
    for (let i = 0; i < listCustomer.length; i++) {
        countCus++;
        tableString = tableString + '<tr>\n' +
            '        <td>' + (i + 1) + '</td>\n' +
            '        <td>' + listCustomer[i].getName() + '</td>\n' +
            '        <td>' + listCustomer[i].getDayOfBirth() + '</td>\n' +
            '<td><div class="buttonList">\n' +
            '        <ul>\n' +
            '            <li><a class="btnList" href="#" onclick="displayCustomer('+ i +')">Display Customer</a></li>\n' +
            '            <li><a class="btnList" href="#" onclick="editCustomer(' + i + ')">Edit</a></li>\n' +
            '            <li><a class="btnList" href="#" onclick="deleteCustomer(' + i + ')">Delete</a></li>\n' +
            '            <li><a class="btnList" href="#" onclick="totalPayCustomer(' + i + ')">Total pay</a></li>\n' +
            '        </ul>\n' +
            '    </div></td>\n' +
            '    </tr>'
    }
    tableString = tableString + '</table>';
    document.getElementById('show').innerHTML = tableString;
    document.getElementById('titleHome').innerText = '';
}

function displayCustomer(i) {
    let hienThiKH = '<h1>Thông tin khách hàng:</h1>\n' +
        '<h3>Họ và tên\\Full name:</h3>\n' +
        '<p>' + listCustomer[i].getName() + '</p>\n' +
        '<h3>CMND\\ID card:</h3>\n' +
        '<p>' + listCustomer[i].getDayOfBirth() + '</p>\n' +
        '<h3>Ngày sinh\\Date of birth:</h3>\n' +
        '<p>' + listCustomer[i].getIdCard() + '</p>\n' +
        '<h3>Email:</h3>\n' +
        '<p>' + listCustomer[i].getEmail() + '</p>\n' +
        '<h3>Ngày thuê\\Ren days:</h3>\n' +
        '<p>' + listCustomer[i].getRenDays() + '</p>\n' +
        '<h3>Số người đi kèm\\Accompanying:</h3>\n' +
        '<p>' + listCustomer[i].getAccompanying() + '</p>\n' +
        '<h3>Loại thành viên\\Type of customer:</h3>\n' +
        '<p>' + listCustomer[i].getTypeOfCustomer() + '</p>\n' +
        '<h3>Loại dịch vụ\\Type of service:</h3>\n' +
        '<p>' + listCustomer[i].getTypeOfService() + '</p>\n' +
        '<h3>Loại phòng\\Type of room:</h3>' +
        '<p>' + listCustomer[i].getTypeOfRoom() + '</p>\n';
    document.getElementById('show').innerHTML = hienThiKH;
}

function editCustomer(i) {
    let formEditCus = "<h1>Nhập thông tin cần chỉnh sửa của khách hàng :</h1>\n" +
        "<form>\n" +
        "    <h3>Họ và tên\\Full name:</h3>\n" +
        "    <input type=\"text\" id=\"nameCus\">\n" +
        "    <h3>CMND\\ID card:</h3>\n" +
        "    <input type=\"text\" id=\"idCus\">\n" +
        "    <h3>Ngày sinh\\Date of birth:</h3>\n" +
        "    <input type=\"text\" id=\"dateCus\">\n" +
        "    <h3>Email:</h3>\n" +
        "    <input type=\"text\" id=\"emailCus\">\n" +
        "    <h3>Ngày thuê\\Ren days:</h3>\n" +
        "    <input type=\"number\" id=\"renDays\">\n" +
        "    <h3>Số người đi kèm\\Accompanying:</h3>\n" +
        "    <input type=\"number\" id=\"accom\">\n" +
        "    <h3>Loại thành viên\\Type of customer:</h3>\n" +
        "    <select id=\"typeCuss\">\n" +
        "        <option value=\"Diamond\">Diamond</option>\n" +
        "        <option value=\"Platinum\">Platinum</option>\n" +
        "        <option value=\"Gold\">Gold</option>\n" +
        "        <option value=\"Silver\">Silver</option>\n" +
        "        <option value=\"Member\">Member</option>\n" +
        "    </select>\n" +
        "    <h3>Loại dịch vụ\\Type of service:</h3>\n" +
        "    <select id=\"typeSer\">\n" +
        "        <option value=\"Villa\">Villa</option>\n" +
        "        <option value=\"House\">House</option>\n" +
        "        <option value=\"Room\">Room</option>\n" +
        "    </select>\n" +
        "    <h3>Loại phòng\\Type of room:</h3>\n" +
        "    <select id=\"typeRoom\">\n" +
        "        <option value=\"Vip\">Vip</option>\n" +
        "        <option value=\"Business\">Business</option>\n" +
        "        <option value=\"Normal\">Normal</option>\n" +
        "    </select>\n" +
        "    <br>\n" +
        "    <br>\n" +
        "    <input type=\"reset\" value=\"Reset\">\n" +
        "</form>\n" +
        "<br>\n" +
        "<input type=\"button\" value=\"Submit\" onclick=\"submitEditCus()\">";
    document.getElementById('show').innerHTML = formEditCus;
    document.getElementById('nameCus').value = listCustomer[i].getName();
    document.getElementById('idCus').value = listCustomer[i].getIdCard();
    document.getElementById('dateCus').value = listCustomer[i].getDayOfBirth();
    document.getElementById('emailCus').value = listCustomer[i].getEmail();
    document.getElementById('renDays').value = listCustomer[i].getRenDays();
    document.getElementById('accom').value = listCustomer[i].getAccompanying();

}

function submitEditCus(i) {
    let nameEdit = "";
    let name = document.getElementById('nameCus').value;
    name = name.trim().toLowerCase();
    for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) === " " && name.charAt(i + 1) === " ") {
            continue;
        }
        if (i === 0 || name.charAt(i - 1) === " ") {
            nameEdit += name.charAt(i).toUpperCase();
            continue
        }
        nameEdit += name.charAt(i);
    }
    name = nameEdit;
    if (name === '') {
        document.getElementById('nameCus').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('nameCus').style.borderColor = "blue";
    }
    let id = document.getElementById('idCus').value;
    let testID = checkID.test(id);
    if (!testID) {
        check = false;
        document.getElementById('idCus').style.borderColor = "red";
    } else {
        document.getElementById('idCus').style.borderColor = "blue";
    }

    let birth = document.getElementById('dateCus').value;
    let testBirth = checkBirth.test(birth);
    if (!testBirth) {
        document.getElementById('dateCus').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('dateCus').style.borderColor = "blue";
    }
    let email = document.getElementById('emailCus').value;
    let testEmail = checkEmail.test(email);
    if (!testEmail) {
        document.getElementById('emailCus').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('emailCus').style.borderColor = "blue";
    }
    let renDays = document.getElementById('renDays').value;
    if (renDays === '') {
        document.getElementById('renDays').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('renDays').style.borderColor = "blue";
    }
    let accom = document.getElementById('accom').value;
    if (accom === '') {
        document.getElementById('accom').style.borderColor = "red";
        check = false;
    } else {
        document.getElementById('accom').style.borderColor = "blue";
    }
    let typeCus = document.getElementById('typeCuss').value;
    let typeSer = document.getElementById('typeSer').value;
    let typeRoom = document.getElementById('typeRoom').value;
    if (check === true) {
        let objNewCustomer = new Customer(name, id, birth, email, renDays, accom, typeCus, typeSer, typeRoom);
        listCustomer.splice(i, 1, objNewCustomer);
        // document.getElementById('add').innerText='';
        document.getElementById('show').innerText = '';
        tableAdd();
    }
    check = true;
}

function deleteCustomer(i) {
    listCustomer.splice(i, 1);
    tableAdd();
    document.getElementById('show').innerText = "";
}

function totalPayCustomer(i) {
    let totalPay = '<h1>Thông tin khách hàng:</h1>\n' +
        '<h3>Họ và tên\\Full name:</h3>\n' +
        '<p>' + listCustomer[i].getName() + '</p>\n' +
        '<h3>CMND\\ID card:</h3>\n' +
        '<p>' + listCustomer[i].getDayOfBirth() + '</p>\n' +
        '<h3>Ngày sinh\\Date of birth:</h3>\n' +
        '<p>' + listCustomer[i].getIdCard() + '</p>\n' +
        '<h3>Email:</h3>\n' +
        '<p>' + listCustomer[i].getEmail() + '</p>\n' +
        '<h3>Ngày thuê\\Ren days:</h3>\n' +
        '<p>' + listCustomer[i].getRenDays() + '</p>\n' +
        '<h3>Số người đi kèm\\Accompanying:</h3>\n' +
        '<p>' + listCustomer[i].getAccompanying() + '</p>\n' +
        '<h3>Loại thành viên\\Type of customer:</h3>\n' +
        '<p>' + listCustomer[i].getTypeOfCustomer() + '</p>\n' +
        '<h3>Loại dịch vụ\\Type of service:</h3>\n' +
        '<p>' + listCustomer[i].getTypeOfService() + '</p>\n' +
        '<h3>Loại phòng\\Type of room:</h3>' +
        '<p>' + listCustomer[i].getTypeOfRoom() + '</p>\n' +
        '<h3>Tổng tiền cần thanh toán\\Total pay:</h3>' +
        '<p>' + listCustomer[i].totalPay() + '</p>\n';
    document.getElementById('show').innerHTML = totalPay;
}