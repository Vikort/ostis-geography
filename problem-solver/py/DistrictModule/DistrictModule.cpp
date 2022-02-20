/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "DistrictModule.hpp"

SC_IMPLEMENT_MODULE(DistrictModule)

sc_result DistrictModule::InitializeImpl()
{
  m_DistrictService.reset(new DistrictPythonService("DistrictModule/DistrictModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_DistrictService->Run();
  return SC_RESULT_OK;
}

sc_result DistrictModule::ShutdownImpl()
{
  m_DistrictService->Stop();
  m_DistrictService.reset();
  return SC_RESULT_OK;
}
