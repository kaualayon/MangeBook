const mongoose = require('mongoose');
const Book = require('./models/book'); // Importa o modelo de livros

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://limakaua582:k07120629@library.r5nfy.mongodb.net/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Array de livros para adicionar ao banco de dados
const books = [
    { 
      id: 1, 
      title: 'O Alquimista', 
      author: 'Paulo Coelho', 
      image: '/images/o_alquimista.jpg', 
      description: 'Uma jornada de autoconhecimento que se desenrola por toda a Terra, O Alquimista é uma história profunda sobre os mistérios da vida e a busca pelo significado pessoal.',
      publicationYear: 1988, 
      genre: 'Ficção', 
      isbn: '978-85-7023-344-9', 
      availableCopies: 5
    },
    { 
      id: 2, 
      title: '1984', 
      author: 'George Orwell', 
      image: '/images/1984.jpg', 
      description: 'Um romance distópico que aborda os efeitos de um regime totalitário sobre a liberdade individual e a manipulação de informações.',
      publicationYear: 1949, 
      genre: 'Distopia', 
      isbn: '978-0-452-28423-4', 
      availableCopies: 3
    },
    { 
      id: 3, 
      title: 'Dom Casmurro', 
      author: 'Machado de Assis', 
      image: '/images/dom_casmurro.jpg', 
      description: 'Considerada uma das obras mais complexas de Machado de Assis, Dom Casmurro é a história de um homem obcecado pela suspeita de traição de sua esposa.',
      publicationYear: 1900, 
      genre: 'Romance', 
      isbn: '978-85-359-0289-9', 
      availableCopies: 4
    },
    { 
      id: 4, 
      title: 'A Moreninha', 
      author: 'Joaquim Manuel de Macedo', 
      image: '/images/a_moreninha.jpg', 
      description: 'Romance que explora a sociedade brasileira do século XIX, suas convenções sociais e o amor adolescente.',
      publicationYear: 1844, 
      genre: 'Romance', 
      isbn: '978-85-359-0361-2', 
      availableCopies: 2
    },
    { 
      id: 5, 
      title: 'O Pequeno Príncipe', 
      author: 'Antoine de Saint-Exupéry', 
      image: '/images/o_pequeno_principe.jpg', 
      description: 'A história encantadora de um jovem príncipe que viaja de planeta em planeta, aprendendo sobre a natureza humana e o amor.',
      publicationYear: 1943, 
      genre: 'Fábula', 
      isbn: '978-85-359-0275-2', 
      availableCopies: 6
    },
    { 
      id: 6, 
      title: 'Cem Anos de Solidão', 
      author: 'Gabriel García Márquez', 
      image: '/images/cem_anos_de_solidao.jpg', 
      description: 'Um dos maiores romances do século XX, abordando o realismo mágico e a história da família Buendía, situada na cidade fictícia de Macondo.',
      publicationYear: 1967, 
      genre: 'Realismo Mágico', 
      isbn: '978-85-359-0273-8', 
      availableCopies: 3
    },
    { 
      id: 7, 
      title: 'A Revolução dos Bichos', 
      author: 'George Orwell', 
      image: '/images/a_revolucao_dos_bichos.jpg', 
      description: 'Uma sátira política que critica o totalitarismo, utilizando um grupo de animais para representar a revolução e seus resultados.',
      publicationYear: 1945, 
      genre: 'Fábula, Política', 
      isbn: '978-0-452-28424-1', 
      availableCopies: 4
    },
    { 
      id: 8, 
      title: 'O Senhor dos Anéis', 
      author: 'J.R.R. Tolkien', 
      image: '/images/o_senhor_dos_aneis.jpg', 
      description: 'A clássica história de fantasia que narra a jornada de um grupo de heróis para destruir o Um Anel e derrotar o Senhor das Trevas, Sauron.',
      publicationYear: 1954, 
      genre: 'Fantasia', 
      isbn: '978-0-261-10233-4', 
      availableCopies: 5
    },
    { 
      id: 9, 
      title: 'Fahrenheit 451', 
      author: 'Ray Bradbury', 
      image: '/images/fahrenheit_451.jpg', 
      description: 'Em um futuro distópico, os livros são proibidos e queimados, mas um bombeiro começa a questionar o sistema opressor.',
      publicationYear: 1953, 
      genre: 'Distopia', 
      isbn: '978-0-7432-4722-1', 
      availableCopies: 3
    },
    { 
      id: 10, 
      title: 'A Menina que Roubava Livros', 
      author: 'Markus Zusak', 
      image: '/images/a_menina_que_roubava_livros.jpg', 
      description: 'Uma história comovente sobre uma menina durante a Segunda Guerra Mundial que encontra consolo e força nos livros.',
      publicationYear: 2005, 
      genre: 'Histórico, Drama', 
      isbn: '978-0-375-84220-7', 
      availableCopies: 4
    },
    { 
      id: 11, 
      title: 'O Sol é para Todos', 
      author: 'Harper Lee', 
      image: '/images/o_sol_e_para_todos.jpg', 
      description: 'Uma poderosa narrativa sobre preconceito racial e injustiça, vista através dos olhos de uma criança no sul dos Estados Unidos.',
      publicationYear: 1960, 
      genre: 'Ficção', 
      isbn: '978-0-06-112008-4', 
      availableCopies: 2
    },
    { 
      id: 12, 
      title: 'Orgulho e Preconceito', 
      author: 'Jane Austen', 
      image: '/images/orgulho_e_preconceito.jpg', 
      description: 'A história de Elizabeth Bennet e sua relação com o aristocrático Sr. Darcy, que começa marcada pelo orgulho e preconceito.',
      publicationYear: 1813, 
      genre: 'Romance', 
      isbn: '978-1-85326-000-1', 
      availableCopies: 3
    },
    { 
      id: 13, 
      title: 'O Hobbit', 
      author: 'J.R.R. Tolkien', 
      image: '/images/o_hobbit.jpg', 
      description: 'A aventura de Bilbo Baggins, um hobbit que se vê no meio de uma jornada épica para recuperar um tesouro roubado.',
      publicationYear: 1937, 
      genre: 'Fantasia', 
      isbn: '978-0-618-00221-3', 
      availableCopies: 5
    },
    { 
      id: 14, 
      title: 'O Conto da Aia', 
      author: 'Margaret Atwood', 
      image: '/images/o_conto_da_aia.jpg', 
      description: 'Em uma sociedade distópica, as mulheres são usadas como reprodutoras, e a protagonista busca sobreviver ao regime totalitário.',
      publicationYear: 1985, 
      genre: 'Distopia, Feminismo', 
      isbn: '978-0-385-26098-1', 
      availableCopies: 3
    },
    { 
      id: 15, 
      title: 'A Sombra do Vento', 
      author: 'Carlos Ruiz Zafón', 
      image: '/images/a_sombra_do_vento.jpg', 
      description: 'Um jovem encontra um livro raro que o leva a uma trama misteriosa sobre a vida do autor e as pessoas que o cercam.',
      publicationYear: 2001, 
      genre: 'Mistério, Suspense', 
      isbn: '978-0-452-28767-2', 
      availableCopies: 2
    },
    { 
      id: 16, 
      title: 'Os Miseráveis', 
      author: 'Victor Hugo', 
      image: '/images/os_miseraveis.jpg', 
      description: 'Uma das maiores obras da literatura francesa, que narra a luta de Jean Valjean contra a injustiça social e seu passado criminal.',
      publicationYear: 1862, 
      genre: 'Romance', 
      isbn: '978-0-375-72494-2', 
      availableCopies: 3
    },
    { 
      id: 17, 
      title: 'O Lobo da Estepe', 
      author: 'Hermann Hesse', 
      image: '/images/o_lobo_da_estepe.jpg', 
      description: 'O romance de um homem dividido entre suas duas naturezas, a do lobo selvagem e a do homem civilizado.',
      publicationYear: 1927, 
      genre: 'Filosofia, Romance', 
      isbn: '978-0-06-256919-8', 
      availableCopies: 4
    },
    { 
      id: 18, 
      title: 'Crime e Castigo', 
      author: 'Fiódor Dostoiévski', 
      image: '/images/crime_e_castigo.jpg', 
      description: 'A história de Raskólnikov, um jovem que comete um assassinato e é consumido pela culpa e pela busca de redenção.',
      publicationYear: 1866, 
      genre: 'Romance, Psicologia', 
      isbn: '978-0-14-310763-7', 
      availableCopies: 3
    },
    { 
      id: 19, 
      title: 'A Insustentável Leveza do Ser', 
      author: 'Milan Kundera', 
      image: '/images/a_insustentavel_leveza_do_ser.jpg', 
      description: 'Uma reflexão filosófica sobre a vida e as escolhas, centrada em três personagens no contexto da Revolução de 1968 na Tchecoslováquia.',
      publicationYear: 1984, 
      genre: 'Filosofia, Romance', 
      isbn: '978-0-06-092107-8', 
      availableCopies: 4
    },
    { 
      id: 20, 
      title: 'O Código da Vinci', 
      author: 'Dan Brown', 
      image: '/images/o_codigo_da_vinci.jpg', 
      description: 'O Código Da Vinci é um thriller que mistura mistério, história e símbolos ocultos. A história segue o professor de simbologia Robert Langdon, que é chamado para investigar o assassinato de um curador do Museu do Louvre, em Paris.',
      publicationYear: 2003, 
      genre: 'Mistério, Suspense', 
      isbn: '978-0-385-50420-8', 
      availableCopies: 5
    }
  ];
  

// Função para popular o banco de dados
const seedBooks = async () => {
  try {
    // Limpar coleção antes de popular (opcional)
    await Book.deleteMany({});
    console.log("Coleção de livros limpa!");

    // Inserir livros
    const insertedBooks = await Book.insertMany(books);
    console.log("Livros adicionados ao banco de dados:", insertedBooks);

    mongoose.disconnect(); // Fecha a conexão após inserir os livros
    console.log("Conexão com o banco de dados encerrada.");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
    mongoose.disconnect();
  }
};

// Executa o script
seedBooks();
