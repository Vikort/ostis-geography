/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchOpenedCinemasModule.hpp"

SC_IMPLEMENT_MODULE(SearchOpenedCinemasModule)

sc_result SearchOpenedCinemasModule::InitializeImpl()
{
  m_SearchOpenedCinemasService.reset(new SearchOpenedCinemasAgentPythonService("SearchOpenedCinemasAgent/SearchOpenedCinemasModule.py"));
  m_SearchOpenedCinemasService->Run();
  return SC_RESULT_OK;
}

sc_result SearchOpenedCinemasModule::ShutdownImpl()
{
  m_SearchOpenedCinemasService->Stop();
  m_SearchOpenedCinemasService.reset();
  return SC_RESULT_OK;
}
