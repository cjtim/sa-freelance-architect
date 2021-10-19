import { Router } from 'express'
import { apiEndpoints } from '@/config'
import ProjectController from '../controller/project'
import CustomerController from '../controller/customer'
import FurnitureController from '../controller/furniture'
import FileListController from '../controller/file_list'
import { ContractController } from '../controller/contract'

const api = Router()

// Project
api.get(apiEndpoints.projects, ProjectController.get)
api.post(apiEndpoints.projects, ProjectController.create)

// Customer
api.get(apiEndpoints.customers, CustomerController.get)
api.post(apiEndpoints.customers, CustomerController.create)

// Furniture
api.get(apiEndpoints.furnitures, FurnitureController.get)
api.post(apiEndpoints.furnitures, FurnitureController.create)
api.delete(apiEndpoints.furnitures, FurnitureController.delete)

// fileList
api.get(apiEndpoints.fileList, FileListController.get)
api.post(apiEndpoints.fileList, FileListController.create)
api.delete(apiEndpoints.fileList, FileListController.delete)

// Contract
api.get(apiEndpoints.contracts, ContractController.get)
api.post(apiEndpoints.contracts, ContractController.upsert)

export { api }
