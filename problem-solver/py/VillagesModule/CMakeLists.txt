file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (VillagesModule SHARED ${SOURCES})

target_include_directories(VillagesModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(VillagesModule sc-memory)

add_dependencies(VillagesModule sc-memory)

sc_codegen(VillagesModule ${CMAKE_CURRENT_LIST_DIR})
