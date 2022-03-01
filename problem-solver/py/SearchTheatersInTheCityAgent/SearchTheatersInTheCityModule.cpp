/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchTheatersInTheCityModule.hpp"

SC_IMPLEMENT_MODULE(SearchTheatersInTheCityModule)

sc_result SearchTheatersInTheCityModule::InitializeImpl()
{
  m_SearchTheatersInTheCityService.reset(new SearchTheatersInTheCityAgentPythonService("SearchTheatersInTheCityAgent/SearchTheatersInTheCityModule.py"));
  m_SearchTheatersInTheCityService->Run();
  return SC_RESULT_OK;
}

sc_result SearchTheatersInTheCityModule::ShutdownImpl()
{
  m_SearchTheatersInTheCityService->Stop();
  m_SearchTheatersInTheCityService.reset();
  return SC_RESULT_OK;
}
