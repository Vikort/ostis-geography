/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "LibraryModule.hpp"

SC_IMPLEMENT_MODULE(LibraryModule)

sc_result LibraryModule::InitializeImpl()
{
  m_LibraryService.reset(new LibraryPythonService("LibraryModule/LibraryModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_LibraryService->Run();
  return SC_RESULT_OK;
}

sc_result LibraryModule::ShutdownImpl()
{
  m_LibraryService->Stop();
  m_LibraryService.reset();
  return SC_RESULT_OK;
}
