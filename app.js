// Seleciona os elementos DOM para os botões de navegação e o carrossel
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

// Define o tempo de duração da animação e o intervalo automático
let timeRunning = 3000; // Tempo de execução da animação (em milissegundos)
let timeAutoNext = 7000; // Intervalo para avançar automaticamente (em milissegundos)
let runTimeOut; // Variável para armazenar o timeout
let autoSlide; // Variável para armazenar o intervalo automático

// Função para mostrar o slide dependendo do tipo (next ou prev)
function showSlider(type) {
    // Seleciona todos os itens do carrossel e miniaturas
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');
    
    if (type == 'next') {
        // Move o primeiro item da lista para o final para o próximo slide
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        // Adiciona a classe 'next' para aplicar a animação
        carouselDom.classList.add('next');
    } else if (type == 'prev') {
        // Move o último item da lista para o início para o slide anterior
        listItemDom.insertBefore(itemSlider[itemSlider.length - 1], itemSlider[0]);
        thumbnailDom.insertBefore(itemThumbnail[itemThumbnail.length - 1], itemThumbnail[0]);
        // Adiciona a classe 'prev' para aplicar a animação
        carouselDom.classList.add('prev');
    }

    // Limpa qualquer timeout anterior e remove as classes após a animação
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        // Remove as classes 'next' e 'prev' para resetar o estado
        carouselDom.classList.remove('next', 'prev');
    }, timeRunning);
}

// Função para resetar o intervalo automático após uma interação manual
function resetAutoSlide() {
    clearInterval(autoSlide); // Limpa o intervalo automático anterior
    // Define um novo intervalo para o avanço automático dos slides
    autoSlide = setInterval(() => {
        showSlider('next'); // Avança para o próximo slide automaticamente
    }, timeAutoNext);
}

// Define os eventos de clique para os botões 'next' e 'prev'
nextDom.onclick = function() {
    showSlider('next'); // Avança para o próximo slide ao clicar no botão 'next'
    resetAutoSlide(); // Reseta o intervalo automático
}

prevDom.onclick = function() {
    showSlider('prev'); // Volta para o slide anterior ao clicar no botão 'prev'
    resetAutoSlide(); // Reseta o intervalo automático
}

// Inicia o carrossel automático ao carregar a página
autoSlide = setInterval(() => {
    showSlider('next'); // Avança automaticamente para o próximo slide
}, timeAutoNext);
