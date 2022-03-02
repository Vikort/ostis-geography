#include "FindCateringOrganizationByWorkingHoursModule.hpp"

SC_IMPLEMENT_MODULE(FindCateringOrganizationByWorkingHoursAgentModule)

sc_result FindCateringOrganizationByWorkingHoursAgentModule::InitializeImpl()
{
  m_FindCateringOrganizationByWorkingHoursService.reset(new FFindCateringOrganizationByWorkingHoursAgentPythonService("FindCateringOrganizationByWorkingHoursAgent/FindCateringOrganizationByWorkingHoursModule.py"));
  m_FindCateringOrganizationByWorkingHoursService->Run();
  return SC_RESULT_OK;
}

sc_result FFindCateringOrganizationByWorkingHoursAgentModule::ShutdownImpl()
{
  m_FindCateringOrganizationByWorkingHoursService->Stop();
  m_FindCateringOrganizationByWorkingHoursService.reset();
  return SC_RESULT_OK;
}
