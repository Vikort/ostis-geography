/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindCateringOrganizationByRateModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByRateAgentModule)

sc_result FindCateringOrganizationByRateAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByRateService.reset(new FindCateringOrganizationByRateAgentPythonService("FindCateringOrganizationByRateAgent/FindCateringOrganizationByRateModule.py"));
  m_FindCateringOrganizationByRateService->Run();
  return SC_RESULT_OK;
}

sc_result FindCateringOrganizationByRateAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByRateService->Stop();
  m_FindCateringOrganizationByRateService.reset();
  return SC_RESULT_OK;
}
