let produtos;

window.onload = function () {
    var storageUser = localStorage.getItem('usuario');

    if (storageUser) {
        var user = JSON.parse(storageUser);

        var dataEntrada = new Date(user.dataEntrada);

        var dataFormatada = dataEntrada.toLocaleString("pt-BR", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });

        const userElement = document.getElementById('user');
        const perfilElement = document.getElementById('perfil');
        const idPerfilElement = document.getElementById('idPerfil');

        if (userElement) userElement.textContent = user.name;
        if (perfilElement) perfilElement.textContent = dataFormatada;
        if (idPerfilElement) idPerfilElement.textContent = user.id;
    }
};

document.addEventListener('DOMContentLoaded', function () {

    fetch("../Dados/data.json")
        .then((response) => response.json())
        .then((data) => {

            produtos = data;

            const produtosContainer =
                document.getElementById("produtos-container");

            produtos.forEach((produto, index) => {

                const card = document.createElement("div");

                card.innerHTML = `
                    <div class="card">
                        <img
                            src="${produto.imagem}"
                            class="card-img-top"
                            alt="${produto.desc}"
                        >

                        <div class="card-body">

                            <h5 class="card-title">
                                ${produto.desc}
                            </h5>

                            <p class="card-text">
                                R$ ${produto.valor.toFixed(2)}
                            </p>

                            <a
                                href="#"
                                class="btn btn-primary adicionar"
                                data-indice="${index}"
                            >
                                Adicionar ao carrinho
                            </a>

                        </div>
                    </div>
                `;

                produtosContainer.appendChild(card);
            });

        })
        .catch((error) =>
            console.log("Erro ao carregar dados:", error)
        );
});