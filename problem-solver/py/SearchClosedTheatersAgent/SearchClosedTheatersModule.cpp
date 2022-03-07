/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchClosedTheatersModule.hpp"

SC_IMPLEMENT_MODULE(SearchClosedTheatersModule)

sc_result SearchClosedTheatersModule::InitializeImpl()
{
  m_SearchClosedTheatersService.reset(new SearchClosedTheatersAgentPythonService("SearchClosedTheatersAgent/SearchClosedTheatersModule.py"));
  m_SearchClosedTheatersService->Run();
  return SC_RESULT_OK;
}

sc_result SearchClosedTheatersModule::ShutdownImpl()
{
  m_SearchClosedTheatersService->Stop();
  m_SearchClosedTheatersService.reset();
  return SC_RESULT_OK;
}
