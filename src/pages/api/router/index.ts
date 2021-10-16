import { Router } from 'express'
import { apiEndpoints } from '@/config'
import ProjectController from '../controller/project'
import CustomerController from '../controller/customer'
import FurnitureController from '../controller/furniture'
import FileListController from '../controller/file_list'

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

api.get(apiEndpoints.fileList, FileListController.get)
api.post(apiEndpoints.fileList, FileListController.create)

export { api }
