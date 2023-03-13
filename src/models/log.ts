import getConnection from "../db"

export class LogModel {

  async saveTransactionLog(log: any): Promise<any> {
    const db = await getConnection();
    return new Promise((resolve: any, reject: any) => {
      db('transactions')
        .insert(log)
        .then(() => resolve())
        .catch((error: any) => reject(error))
        .finally(async () => {
          await db.destroy();
        });
    });
  }

}