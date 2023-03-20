const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");
const instagram = document.getElementById("instagram");
const facebook = document.getElementById("facebook");

inputQuestion.addEventListener("keypress", (e) => {
        if(inputQuestion.value && e.key === "Enter"){
            SendQuestion();
        }
    });

instagram.focus();
const OPENAI_API_KEY = "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";
var respostas = [];
var perguntas = [];
var resultado = [];
var perguntega = [];
var cont = -1;


function SendQuestion (){
    if(instagram.value === ""){
        alert("Digite o número de seguidores do instagram.");
        location.reload();
    }
    if(facebook.value === ""){
        alert("Digite o número de seguidores do facebook.")
        location.reload();
    }

    cont += 1;
    perguntas.splice(0, 0, "Agora você é um especialista de redes digitais dessa empresa: "+inputQuestion.value);
    perguntas.splice(1, 0, "\n\n você consegue montar uma persona para esse negócio com as dores, objetivos e interesses?");
    perguntas.splice(2, 0, "\n\n você consegue me passar um entendimento de como os pais e responsáveis por quartos de criança se comportam nas redes sociais e como eles consomem conteúdo?");
    perguntas.splice(3, 0, "\n\n agora você consegue criar o público alvo para as redes sociais desse negócio?");
    perguntas.splice(4, 0, "\n\n com essas informações você consegue definir quais os objetivos desse negócio para as redes sociais?");
    perguntas.splice(5, 0, "\n\n e quais redes sociais e as estratégias que vamos usar em cada uma para essa empresa?");
    perguntas.splice(6, 0, `\n\n levando em consideração que ela tem ${instagram.value} seguidores no instagram. No facebook ela tem ${facebook.value} seguidores. Você consegue criar KPI de acompanhamento para essas redes para os próximos 3 meses para essa rede?`)
    var sQuestion = perguntas[cont];
        fetch("https://api.openai.com/v1/completions",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization : "Bearer " + OPENAI_API_KEY,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: sQuestion,
                max_tokens: 2048, //tamanho da resposta
                temperature: 0.5, //criatividade da resposta
            })
        })
            .then((response) => response.json())
            .then((json) => {
                  result.scrollTop = result.scrollHeight;
                if(result.value) result.value += "\n";
                if(json.error?.message){
                    result.value += `Error: ${json.error.message}`;
                }
                else if(json.choices?.[0].text){
                    //for(var i = 0; i < 7; i){
                        var text = json.choices[0].text || "Sem resposta";
                        inputQuestion.value = perguntas[cont];
                        sQuestion = perguntas[cont];
                        perguntega += '\n\n' + `PERGUNTA:` + '\n\n' + `${sQuestion}`;
                        if(cont === 1 || cont === 3 || cont === 4 || cont === 6){
                            resultado += '\n\n' + text;
                            if(cont === 6){
                                result.value = resultado;
                            }
                        }
                        result.scrollTop = result.scrollHeight;
                    //}
                }
            })
            .catch((error) => console.error("Error:", error))
            .finally (() => {
                inputQuestion.value = "";
                inputQuestion.disabled = false;
                if(cont === 0 || cont === 1 || cont === 2 || cont === 3 || cont === 4 ||cont === 5){
                    inputQuestion.value = ".";
                    SendQuestion();
                }
                if(cont === 7){
                    inputQuestion.disabled = true;
                }
                inputQuestion.focus();
            });
    // for(var i = 0; i < perguntas.length; i++){
    //     alert(perguntas[i])
    // }

    if(result.value) result.value += "\n\n\n";

    //result.value += `PERGUNTA:` + '\n\n' + `${sQuestion}`;

    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;
    facebook.disabled = true;
    instagram.disabled = true;
    result.scrollTop = result.scrollHeight;
}

// 