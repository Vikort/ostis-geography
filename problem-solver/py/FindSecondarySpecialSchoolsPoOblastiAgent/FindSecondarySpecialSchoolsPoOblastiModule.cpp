/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindSecondarySpecialSchoolsPoOblastiModule.hpp"

SC_IMPLEMENT_MODULE(FindSecondarySpecialSchoolsPoOblastiAgentModule)

sc_result FindSecondarySpecialSchoolsPoOblastiAgentModule::InitializeImpl()
{
  m_FindSecondarySpecialSchoolsPoOblastiService.reset(new FindSecondarySpecialSchoolsPoOblastiAgentPythonService("FindSecondarySpecialSchoolsPoOblastiAgent/FindSecondarySpecialSchoolsPoOblastiModule.py"));
  m_FindSecondarySpecialSchoolsPoOblastiService->Run();
  return SC_RESULT_OK;
}

sc_result FindSecondarySpecialSchoolsPoOblastiAgentModule::ShutdownImpl()
{
  m_FindSecondarySpecialSchoolsPoOblastiService->Stop();
  m_FindSecondarySpecialSchoolsPoOblastiService.reset();
  return SC_RESULT_OK;
}
