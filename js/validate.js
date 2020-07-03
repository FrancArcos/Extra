function validate_buy() {
    // Get inputs
    const date = document.getElementById('date');
    const date_value = date.value.trim();
    const hour = document.getElementById('hour');
    const hour_value = hour.value.trim();
    const store = document.getElementById('store');
    const store_value = store.value.trim();
    const paypal = document.getElementById('paypal');
    const card = document.getElementById('card');

    let errors = 0;

    // Validate date
    if (/^\d{4}-\d{2}-\d{2}$/.test(date_value)) {
        // Get data
        const split_date = date_value.split('-');
        const year = parseInt(split_date[0]);
        const month = parseInt(split_date[1]);
        const day = parseInt(split_date[2]);
        // Get current date
        const today = new Date();
        if (year >= today.getFullYear() && month >= today.getMonth() + 1 && day >= today.getDate()) {
            valid_input(date);
        } else {
            errors ++;
            invalid_input(date);
        }
        // Validate hour
        if (/^\d{2}:\d{2}$/.test(hour_value)) {
            const split_hour = hour_value.split(':');
            const hour_date = new Date(year, month - 1, day, parseInt(split_hour[0]), parseInt(split_hour[1]));
            if (today.getTime() < hour_date.getTime()) {
                valid_input(hour);
            } else {
                errors ++;
                invalid_input(hour);
            }
        } else {
            errors ++;
            invalid_input(hour);
        }
    } else {
        errors ++;
        invalid_input(date);
        invalid_input(hour);
    }

    // Validate store
    if (store_value != '1' && store_value != '2' && store_value != '3' && store_value != '4') {
        errors ++;
        invalid_input(store);
    } else {
        valid_input(store);
    }

    // Validate payment
    if (paypal.checked || card.checked) {
        if (paypal.checked && card.checked) {
            errors ++;
        } else if (paypal.checked) {
            const email = document.getElementById('email');
            const email_value = email.value.trim();
            const password = document.getElementById('password');
            const password_value = password.value;
            if (/^(\w|\.){1,}@\w{1,}\..{1,}$/i.test(email_value)) {
                valid_input(email);
            } else {
                errors ++;
                invalid_input(email);
            }
            if (password_value != '') {
                valid_input(password);
            } else {
                errors ++;
                invalid_input(password);
            }
        } else if (card.checked) {
            const cnumber = document.getElementById('number_card');
            const cnumber_value = cnumber.value;
            const cvc = document.getElementById('cvc');
            const cvc_value = cvc.value;
            const exp = document.getElementById('exp_date');
            const exp_value = exp.value;
            if (/^\d{16}/.test(cnumber_value)) {
                valid_input(cnumber);
            } else {
                errors ++;
                invalid_input(cnumber);
            }
            if (/^\d{3}/.test(cvc_value)) {
                valid_input(cvc);
            } else {
                errors ++;
                invalid_input(cvc);
            }
            if (/^\d{2}\/\d{2}/.test(exp_value)) {
                valid_input(exp);
            } else {
                errors ++;
                invalid_input(exp);
            }
        }
    } else {
        errors ++;
    }

    // Any error
    if (errors == 0) return true;
    // Errors found
    return false;
}

function enable_paypal() {
    const paypal = document.getElementById('paypal_inputs');
    const card = document.getElementById('credit_card_inputs');
    // Enable paypal
    paypal.style.display = 'block';
    // Disable card
    card.style.display = 'none';
}

function enable_card() {
    const paypal = document.getElementById('paypal_inputs');
    const card = document.getElementById('credit_card_inputs');
    // Disable paypal
    paypal.style.display = 'none';
    // Enable card
    card.style.display = 'block';
}

function validate_sign_in() {
    const email = document.getElementById('email');
    const email_value = email.value.trim();
    const password = document.getElementById('password');
    const password_value = password.value;

    let errors = 0;

    // Validate email
    if (/^(\w|\.){1,}@\w{1,}\..{1,}$/i.test(email_value)) {
        valid_input(email);
    } else {
        errors ++;
        invalid_input(email);
    }

    // Validate password
    if (password_value != '') {
        valid_input(password);
    } else {
        errors ++;
        invalid_input(password);
    }

    // Any error
    if (errors == 0) return true;
    // Errors found
    return false;
}

function validate_sign_up() {
    const name = document.getElementById('name');
    const name_value = name.value.trim();
    const lname = document.getElementById('last_name');
    const lname_value = lname.value.trim();
    const email = document.getElementById('email');
    const email_value = email.value.trim();
    const address = document.getElementById('address');
    const address_value = address.value.trim();
    const password = document.getElementById('password');
    const password_value = password.value;
    const rpassword = document.getElementById('repeat_password');
    const rpassword_value = rpassword.value;

    let errors = 0;

    // Validate name
    if (/^\w{1,}/i.test(name_value)) {
        valid_input(name);
    } else {
        errors ++;
        invalid_input(name);
    }

    // Validate last name
    if (/^\w{1,}/i.test(lname_value)) {
        valid_input(lname);
    } else {
        errors ++;
        invalid_input(lname);
    }

    // Validate email
    if (/^(\w|\.){1,}@\w{1,}\..{1,}$/i.test(email_value)) {
        valid_input(email);
    } else {
        errors ++;
        invalid_input(email);
    }

    // Validate address
    if (address_value != '') {
        valid_input(address);
    } else {
        errors ++;
        invalid_input(address);
    }

    // Validate password
    if (password_value != '') {
        valid_input(password);
    } else {
        errors ++;
        invalid_input(password);
    }
    if (rpassword_value != '') {
        valid_input(rpassword);
    } else {
        errors ++;
        invalid_input(rpassword);
    }
    if (password_value != '' && rpassword_value != '' && password_value === rpassword_value) {
        valid_input(rpassword);
    } else {
        errors ++;
        invalid_input(rpassword);
    }

    // Any error
    if (errors == 0) return true;
    // Errors found
    return false;
}

function validate_edit() {
    const name = document.getElementById('name');
    const name_value = name.value.trim();
    const lname = document.getElementById('last_name');
    const lname_value = lname.value.trim();
    const email = document.getElementById('email');
    const email_value = email.value.trim();
    const address = document.getElementById('address');
    const address_value = address.value.trim();
    const password = document.getElementById('password');
    const password_value = password.value;
    const rpassword = document.getElementById('repeat_password');
    const rpassword_value = rpassword.value;

    let errors = 0;

    // Validate name
    if (/^\w{1,}/i.test(name_value)) {
        valid_input(name);
    } else {
        errors ++;
        invalid_input(name);
    }

    // Validate last name
    if (/^\w{1,}/i.test(lname_value)) {
        valid_input(lname);
    } else {
        errors ++;
        invalid_input(lname);
    }

    // Validate email
    if (/^(\w|\.){1,}@\w{1,}\..{1,}$/i.test(email_value)) {
        valid_input(email);
    } else {
        errors ++;
        invalid_input(email);
    }

    // Validate address
    if (address_value != '') {
        valid_input(address);
    } else {
        errors ++;
        invalid_input(address);
    }

    // Validate password
    if (password_value != '') {
        valid_input(password);
        if (rpassword_value != '') {
            if (password_value === rpassword_value) {
                valid_input(rpassword);
            } else {
                errors ++;
                invalid_input(rpassword);
            }
        } else {
            errors ++;
            invalid_input(rpassword);
        }
    }

    // Any error
    if (errors == 0) return true;
    // Errors found
    return false;
}

function invalid_input(input) {
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add('is-invalid');
}

function valid_input(input) {
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}