import getConnection from "../db"

export class LogModel {

  async saveTransactionLog(log: any) {
    const db = await getConnection()
    return db('transactions')
      .insert(log)
  }

}