/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindCateringOrganizationByDayOfWeekModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByDayOfWeekAgentModule)

sc_result FindCateringOrganizationByDayOfWeekAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByDayOfWeekService.reset(new FindCateringOrganizationByDayOfWeekAgentPythonService("FindCateringOrganizationByDayOfWeekAgent/FindCateringOrganizationByDayOfWeekModule.py"));
  m_FindCateringOrganizationByDayOfWeekService->Run();
  return SC_RESULT_OK;
}

sc_result FindCateringOrganizationByDayOfWeekAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByDayOfWeekService->Stop();
  m_FindCateringOrganizationByDayOfWeekService.reset();
  return SC_RESULT_OK;
}