/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchNationalTheatersModule.hpp"

SC_IMPLEMENT_MODULE(SearchNationalTheatersModule)

sc_result SearchNationalTheatersModule::InitializeImpl()
{
  m_SearchNationalTheatersService.reset(new SearchNationalTheatersAgentPythonService("SearchNationalTheatersAgent/SearchNationalTheatersModule.py"));
  m_SearchNationalTheatersService->Run();
  return SC_RESULT_OK;
}

sc_result SearchNationalTheatersModule::ShutdownImpl()
{
  m_SearchNationalTheatersService->Stop();
  m_SearchNationalTheatersService.reset();
  return SC_RESULT_OK;
}
