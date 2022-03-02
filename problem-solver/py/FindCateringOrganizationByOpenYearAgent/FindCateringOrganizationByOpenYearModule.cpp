/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindCateringOrganizationByOpenYearModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByOpenYearAgentModule)

sc_result FindCateringOrganizationByOpenYearAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByOpenYearService.reset(new FindCateringOrganizationByOpenYearAgentPythonService("FindCateringOrganizationByOpenYearAgent/FindCateringOrganizationByOpenYearModule.py"));
  m_FindCateringOrganizationByOpenYearService->Run();
  return SC_RESULT_OK;
}

sc_result FindCateringOrganizationByOpenYearAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByOpenYearService->Stop();
  m_FindCateringOrganizationByOpenYearService.reset();
  return SC_RESULT_OK;
}
