/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindSecondarySpecialSchoolsPoCityModule.hpp"

SC_IMPLEMENT_MODULE(FindSecondarySpecialSchoolsPoCityAgentModule)

sc_result FindSecondarySpecialSchoolsPoCityAgentModule::InitializeImpl()
{
  m_FindSecondarySpecialSchoolsPoCityService.reset(new FindSecondarySpecialSchoolsPoCityAgentPythonService("FindSecondarySpecialSchoolsPoCityAgent/FindSecondarySpecialSchoolsPoCityModule.py"));
  m_FindSecondarySpecialSchoolsPoCityService->Run();
  return SC_RESULT_OK;
}

sc_result FindSecondarySpecialSchoolsPoCityAgentModule::ShutdownImpl()
{
  m_FindSecondarySpecialSchoolsPoCityService->Stop();
  m_FindSecondarySpecialSchoolsPoCityService.reset();
  return SC_RESULT_OK;
}
