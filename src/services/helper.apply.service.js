const HelperApplyModel = require("../repositorys/helper.apply.repository");

const { pool } = require("../config/db");

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class HelperApplyService {

    HelperApplyModel;

    constructor(){
        this.HelperApplyModel = new HelperApplyModel();
    }

    
    // 헬퍼 퀵/사전 활동 지원 서비스) 지원하기 -기존 자기소개서 보기
    retrieveHpApply = async (hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.HelperApplyModel.selectHpIdc(connection, hp_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
    
    // 헬퍼 지원 완료하기 -> 알림 목록으로
    completeHpApply = async (apply_id, mem_id, hp_id, is_new, new_idc, apply_date, start_point, end_point) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Params = [apply_id, mem_id, hp_id, is_new, new_idc, apply_date, start_point, end_point];
            const Result = await this.HelperApplyModel.insertHpApply(connection, Params);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // mem_id의 token가져오기
    retrieveMemToken = async (mem_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.HelperApplyModel.selectMemToken(connection, mem_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
    
    // 알림 목록 저장
    saveMessageService = async (mem_id, message) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.HelperApplyModel.insertAlertMsg(connection, mem_id, message);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 해당 서비스의 시간, 날짜 가져오기
    retrieveHpService = async (apply_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.HelperApplyModel.selectMemService(connection, apply_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
    
    retrieveHpPreIdc = async(hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.HelperApplyModel.selectHpPreIdc(connection, hp_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    firstHpPreIdc = async(content, hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();
            
            const Result = await this.HelperApplyModel.insertHpPreIdc(connection, content, hp_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    modifyHpPreIdc = async(content, hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();
            
            const Result = await this.HelperApplyModel.updateHpPreIdc(connection, content, hp_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    retrieveHpInfo = async(mem_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.HelperApplyModel.selectHpInfo(connection, mem_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
}

module.exports = HelperApplyService;

