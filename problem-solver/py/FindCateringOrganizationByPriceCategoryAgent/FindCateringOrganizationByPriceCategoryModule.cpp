/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindCateringOrganizationByPriceCategoryModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByPriceCategoryAgentModule)

sc_result FindCateringOrganizationByPriceCategoryAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByPriceCategoryService.reset(new FindCateringOrganizationByPriceCategoryAgentPythonService("FindCateringOrganizationByPriceCategoryAgent/FindCateringOrganizationByPriceCategoryModule.py"));
  m_FindCateringOrganizationByPriceCategoryService->Run();
  return SC_RESULT_OK;
}

sc_result FindCateringOrganizationByPriceCategoryAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByPriceCategoryService->Stop();
  m_FindCateringOrganizationByPriceCategoryService.reset();
  return SC_RESULT_OK;
}
