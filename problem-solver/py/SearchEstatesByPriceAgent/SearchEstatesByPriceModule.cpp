/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "SearchEstatesByPriceModule.hpp"

SC_IMPLEMENT_MODULE(SearchEstatesByPriceAgentModule)

sc_result SearchEstatesByPriceAgentModule::InitializeImpl()
{
  m_SearchEstatesByPriceService.reset(new SearchEstatesByPriceAgentPythonService("SearchEstatesByPriceAgent/SearchEstatesByPriceModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_SearchEstatesByPriceService->Run();
  return SC_RESULT_OK;
}

sc_result SearchEstatesByPriceAgentModule::ShutdownImpl()
{
  m_SearchEstatesByPriceService->Stop();
  m_SearchEstatesByPriceService.reset();
  return SC_RESULT_OK;
}
