/**
 * @file 初始化数据脚本
 */

import 'reflect-metadata'
import { InitializeTask } from '../utils/InitializeTask'
import * as process from 'process'

const initialTask = InitializeTask.Instance

initialTask.init()
           .then(() => {
             console.log('initial success')
             process.exit()
           })
           .catch(e => {
             console.log(e)
             process.exit()
           })
