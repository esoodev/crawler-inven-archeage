var KoreanProcessorApi = require('./korProcessorApi');
var KoreanProcessor = require('./korProcessor');
var WordSaver = require('./wordSaver');
var Word = require('./word');

var processor_api = new KoreanProcessorApi();
var processor = new KoreanProcessor();
var saver = new WordSaver();

const debug_processor_api = false;
const debug_processor = false;
const debug_saver = false;
const debug_splitText = true;

const testTexts = ['1주전에 걍 뒤도 안 돌아보고 접음.아키가 묘한 매력이 있어서 3달전에 복귀했는데자칭 육식이라는 새끼들은 지가 무조건 이길거 아니까자만심, 허영심, 인성이 하늘을 뚫더라현실에서 좆 찐따라서 겜에서 깝치고 싶은건 이해를 하겠는데니들 논리대로 좆뉴비 혹은 복귀유저가 쟁이나 레이드쟁에 재미를 느껴서 자발적으로 참여하여 겜이 제대로 굴러갈 확률이 얼마같냐?응 0퍼야 0퍼재미를 느끼려면 내가 고수들한테 지더라도뭔가 할 수 있는게 있고좀만 더하면 따라잡을거 같은 기분이 들어야되는데템을 무슨 시발 원시초대고대태초의 짱짱센템을 쳐 만들어 두셔서쟁이나 레이드? 걍 씹노잼이야 니들만 재밌지 븅신들결국 니들은 뉴비들이 잡몹1 해주기 원하는거 아니냐근데 어떤 븅신이 그 역할을 자처해서 해주겠냐 ㅋㅋ자칭 육식새끼들은 열심히 골드벌어서 템맞추면 된다고 개꼰대같이 입터는데 진짜 조커얼굴처럼 입을 찢어버리고 싶더라.지들이 가장 앞장서서 단체로 약탈 그룹 만들어서 좆뉴비들 골드 못벌게 대륙무역하면 대가리 찢어버리고 낄낄대고 빨간 글씨로 인성질하면서 뭔 골드를 열심히 벌어 시바꺼ㅋ결국 복귀유저나 유입뉴비는 달구지나 사서 돌리게 되는데달구지로 새빠지게 돌아봐야 그걸로 사람구실할 템이나 살 수 있음? 한마디로 개지랄이지꼬라지가 이렇게 돌아가는데육식새끼들 본인들이 겜 돌아가는거 쳐 막아놓고잡몹 1들이 사라져가니까 초식유저나 비난하는 꼬라지를 보아하니 얼마나 빡대가리들인지 감도 안 잡힌다.옆동네 검사봐라 뉴비랑 복귀유저한테 퍼주고 성장채널을 만들어서 아예 진성 육식들이랑 갈라놓으니 육식들은 지들끼리 채널 정해서 피터지게 싸우고, 초식이나 뉴비들은 평화롭게 갬하니까 게임 조온나 잘굴러감. 내가 무릎을 너무 세게치는 바람에 3일째에 펄을 5만원이나 자발적으로 웃으면서 지르게 되더라 ㅋ아 그렇다고 니들 검사하라는거 아님.걍 니들은 와서 물흐리지 말고 아키에서 니들이 겜쳐망치는줄은 모른체 어느 겜에나 있는 초식들이나 쳐 욕하면서 뒤로는 용돈 가져다가 초식 골드 사서 니들끼리 탓하면서 싸우길 바람 ㅋ애초에 급식찐따들한테 비록 작은 게임이라도 경제나 사회가 어떤식으로 돌아가는지 이해해달라고 하는 것도 무리인거 알지만 육식찐따들 ㅂㄷㅂㄷ 대는거 너무 웃겨서 글남긴다.그럼ㅃ'];

if (debug_processor_api) {
    testTexts.forEach((text) => {
        processor_api.normalize(text, (res) => {
            processor_api.tokenize(res, (tokens) => { console.log(tokens) });
        });
    });
}

if (debug_processor) {
    testTexts.forEach((text) => {
        processor.extractEssential(text, (res) => { console.log(res); });
    });
}

if (debug_saver) {
    testTexts.forEach((text) => {
        processor.extractEssential(text, (res) => {
            var word = new Word(res, '2017-05-05 23:43:00');

            if (word.isValid)
                saver.save(word, () => { });
        });
    });
}

if (debug_splitText) {
    console.log(processor._splitText(testTexts[0],20));
}