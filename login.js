$('#loginForm').on('submit', function (event) {
        event.preventDefault();
	const secretKey = 'secret key 123';
	const apiUrl = 'http://localhost:3000/accounts';
        const email = $('#email').val();
        const password = $('#password').val();

        // Fetch users from json-server
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (users) {
                const user = users.find(user => user.email === email);
                if (user) {
                    // Descriptografar a senha armazenada e compará-la com a senha fornecida
                    const decryptedPassword = CryptoJS.AES.decrypt(user.password, secretKey).toString(CryptoJS.enc.Utf8);
                    if (decryptedPassword === password) {
			localStorage.setItem("user",JSON.stringify(user));
                        window.location.href = '/home/index.html';
                    } else {
                        $('#message').text('Invalid username or password').css('color', 'red');
                    }
                } else {
                    $('#message').text('Invalid username or password').css('color', 'red');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#message').text(`Error: ${textStatus}`).css('color', 'red');
            }
        });
    });
 