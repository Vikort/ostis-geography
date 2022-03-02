#include "FindCateringOrganizationByOpenYearModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByOpenYearAgentModule)

sc_result FindCateringOrganizationByOpenYearAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByOpenYearService.reset(new FindCateringOrganizationByOpenYearAgentPythonService("FindCateringOrganizationByOpenYearAgent/FindCateringOrganizationByOpenYearModule.py"));
  m_FindCateringOrganizationByOpenYearService->Run();
  return SC_RESULT_OK;
}

sc_result FindCateringOrganizationByOpenYearAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByOpenYearService->Stop();
  m_FindCateringOrganizationByOpenYearService.reset();
  return SC_RESULT_OK;
}
