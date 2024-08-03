const apiUrl = 'http://localhost:3000/accounts';

function showMessage(element, message, color) {
	element.text(message).css('color', color).fadeIn();
    
	setTimeout(function () {
	    element.fadeOut();
	}, 1500);
    }
    
    function validaNomeUsuario(userName) {
	if (userName.trim() === "") {
	    showMessage($('#errorUserName'), 'Nome não pode ser vazio', 'red');
	    return false;
	} else if (userName.length < 3) {
	    showMessage($('#errorUserName'), 'Nome inválido, deve conter ao menos 3 caracteres', 'red');
	    return false;
	} else {
	    return true;
	}
    }
    
    function validaEmail(email) {
	if (email.trim() === "") {
	    showMessage($('#errorEmail'), 'Email não pode ser vazio', 'red');
	    return false;
	} else if (!email.includes("@")) {
	    showMessage($('#errorEmail'), 'Email inválido, deve conter "@"', 'red');
	    return false;
	} else {
	    return true;
	}
    }
    
    function validaSenha(password) {
	if (password.trim() === "") {
	    showMessage($('#errorPassword'), 'Senha não pode ser vazia', 'red');
	    return false;
	} else if (password.length < 5) {
	    showMessage($('#errorPassword'), 'Senha deve conter ao menos 5 caracteres', 'red');
	    return false;
	} else {
	    return true;
	}
    }
    
    function validaConfirmacaoSenha(confirmPassword, password) {
	if (confirmPassword.trim() === "") {
	    showMessage($('#errorConfirmPassword'), 'Confirmação de senha não pode ser vazia', 'red');
	    return false;
	} else if (confirmPassword !== password) {
	    showMessage($('#errorConfirmPassword'), 'Confirmação de senha e senha estão diferentes', 'red');
	    return false;
	} else {
	    return true;
	}
    }
    
    $(document).ready(function () {
	$('#signupForm').on('submit', function (event) {
	    event.preventDefault();
	    
	    const userName = $('#nome').val();
	    const email = $('#email').val();
	    const password = $('#senha').val();
	    const confirmPassword = $('#confirmPassword').val();
	    
	    const isValidUserName = validaNomeUsuario(userName);
	    const isValidEmail = validaEmail(email);
	    const isValidPassword = validaSenha(password);
	    const isValidConfirmPassword = validaConfirmacaoSenha(confirmPassword, password);
	    
	    if (isValidUserName && isValidEmail && isValidPassword && isValidConfirmPassword) {
		const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret key 123').toString();

		const newUser = {
		    userName,
		    email,
		    password: encryptedPassword,
		    confirmPassword: encryptedPassword
		};
		signup(newUser)
	    }
	});

});
function signup(newUser) {
	$.ajax({
                url: apiUrl,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newUser),
	})
	.done(function() {
		showMessage($('#message'), 'Cadastro realizado com sucesso!', 'green');
		window.location.href = '../index.html';
	}).fail(function(jqXHR, textStatus, errorThrown) {
			showError(`Erro ao criar conta: ${textStatus}`);
	});

}