/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindSecondarySpecialSchoolsPoOpenYearModule.hpp"

SC_IMPLEMENT_MODULE(FindSecondarySpecialSchoolsPoOpenYearAgentModule)

sc_result FindSecondarySpecialSchoolsPoOpenYearAgentModule::InitializeImpl()
{
  m_FindSecondarySpecialSchoolsPoOpenYearService.reset(new FindSecondarySpecialSchoolsPoOpenYearAgentPythonService("FindSecondarySpecialSchoolsPoOpenYearAgent/FindSecondarySpecialSchoolsPoOpenYearModule.py"));
  m_FindSecondarySpecialSchoolsPoOpenYearService->Run();
  return SC_RESULT_OK;
}

sc_result FindSecondarySpecialSchoolsPoOpenYearAgentModule::ShutdownImpl()
{
  m_FindSecondarySpecialSchoolsPoOpenYearService->Stop();
  m_FindSecondarySpecialSchoolsPoOpenYearService.reset();
  return SC_RESULT_OK;
}
