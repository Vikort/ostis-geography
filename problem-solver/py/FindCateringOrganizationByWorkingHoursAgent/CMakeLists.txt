file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindCateringOrganizationByWorkingHoursModule SHARED ${SOURCES})

target_include_directories(FindCateringOrganizationByWorkingHoursModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindCateringOrganizationByWorkingHoursModule sc-memory)

add_dependencies(FindCateringOrganizationByWorkingHoursModule sc-memory)

sc_codegen(FindCateringOrganizationByWorkingHoursModule ${CMAKE_CURRENT_LIST_DIR})
