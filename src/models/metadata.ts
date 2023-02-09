import getConnection from "../db"

export class MetaModel {

  async savePerson(data: any) {
    const db = await getConnection()
    return db('person')
      .insert(data)
      .onConflict(['hospcode', 'hn', 'ingress_zone'])
      .merge(['cid', 'fname', 'lname', 'birth', 'sex', 'd_update', 'updated_at'])
  }

  async saveOpd(data: any) {
    const db = await getConnection()
    return db('opd')
      .insert(data)
      .onConflict(['hospcode', 'hn', 'seq', 'date_serv', 'ingress_zone'])
      .merge(['time_serv', 'diag_text', 'updated_at'])
  }

  async saveIpd(data: any) {
    const db = await getConnection()
    return db('ipd')
      .insert(data)
      .onConflict(['hospcode', 'hn', 'an', 'ingress_zone'])
      .merge(['dischs', 'discht', 'dateadm', 'timeadm', 'datedsc', 'timedsc', 'updated_at'])
  }

}