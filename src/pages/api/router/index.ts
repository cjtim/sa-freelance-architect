import { Router } from 'express'
import { apiEndpoints } from '@/config'
import ProjectController from '../controller/project'
import CustomerController from '../controller/customer'
import FurnitureController from '../controller/furniture'
import FileListController from '../controller/file_list'
import { ContractController } from '../controller/contract'
import { ProjectFurnitureController } from '../controller/project_furniture'
import DeliverTaskController from '../controller/deliver_task'
import { ReceiptController } from '../controller/receipts'

const api = Router()

// Project
api.get(apiEndpoints.projects, ProjectController.get)
api.post(apiEndpoints.projects, ProjectController.create)
api.put(apiEndpoints.projects, ProjectController.update)

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

// Project Furniture
api.get(apiEndpoints.projectFurnitures, ProjectFurnitureController.get)
api.post(apiEndpoints.projectFurnitures, ProjectFurnitureController.upsert)

// DeliverTask
api.get(apiEndpoints.deliverTasks, DeliverTaskController.get)
api.post(apiEndpoints.deliverTasks, DeliverTaskController.create)
api.delete(apiEndpoints.deliverTasks, DeliverTaskController.delete)

// Receipts
api.get(apiEndpoints.receipts, ReceiptController.get)
api.post(apiEndpoints.receipts, ReceiptController.create)

export { api }
