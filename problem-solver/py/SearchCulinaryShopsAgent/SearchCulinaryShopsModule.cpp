/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchCulinaryShopsModule.hpp"

SC_IMPLEMENT_MODULE(SearchCulinaryShopsModule)

sc_result SearchCulinaryShopsModule::InitializeImpl()
{
  m_SearchCulinaryShopsService.reset(new SearchCulinaryShopsAgentPythonService("SearchCulinaryShopsAgent/SearchCulinaryShopsModule.py"));
  m_SearchCulinaryShopsService->Run();
  return SC_RESULT_OK;
}

sc_result SearchCulinaryShopsModule::ShutdownImpl()
{
  m_SearchCulinaryShopsService->Stop();
  m_SearchCulinaryShopsService.reset();
  return SC_RESULT_OK;
}
