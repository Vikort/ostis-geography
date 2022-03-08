file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindCateringOrganizationByDayOfWeekModule SHARED ${SOURCES})

target_include_directories(FindCateringOrganizationByDayOfWeekModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindCateringOrganizationByDayOfWeekModule sc-memory)

add_dependencies(FindCateringOrganizationByDayOfWeekModule sc-memory)

sc_codegen(FindCateringOrganizationByDayOfWeekModule ${CMAKE_CURRENT_LIST_DIR})
