/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindCateringOrganizationByCuisineModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByCuisineAgentModule)

sc_result FindCateringOrganizationByCuisineAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByCuisineService.reset(new FindCateringOrganizationByCuisineAgentPythonService("FindCateringOrganizationByCuisineAgent/FindCateringOrganizationByCuisineModule.py"));
  m_FindCateringOrganizationByCuisineService->Run();
  return SC_RESULT_OK;
}

sc_result FindCateringOrganizationByCuisineAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByCuisineService->Stop();
  m_FindCateringOrganizationByCuisineService.reset();
  return SC_RESULT_OK;
}
