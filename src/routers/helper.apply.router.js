const HelperApplyController = require('../controllers/helper.apply.controller');

const helperApplyRouter = (router)=>{

    this.HelperApplyController = new HelperApplyController();

    // 헬퍼 퀵/사전 활동 지원 서비스) 지원하기 -기존 자기소개서 보기
    router.get('/helper/apply/:hp_id', this.HelperApplyController.getHpApply);

    // 헬퍼 지원 완료하기 -> 지원한 신청서의 시간까지 post
    router.post('/helper/apply',this.HelperApplyController.postHpApply);

    // 헬퍼 마이페이지) 기존 자기소개서 가져오기
    router.get('/helper/preidc/:hp_id',this.HelperApplyController.getHpPreIdc);

    // 헬퍼 마이페이지) 기존 자기소개서 insert or update
    router.post('/helper/preidc',this.HelperApplyController.postHpPreIdc);

    // 헬퍼 마이페이지) 개인정보 가져오기
    router.get('/helper/userinfo/:mem_id',this.HelperApplyController.getHpInfo);

}

module.exports = helperApplyRouter;
